from flask import Blueprint, request, jsonify
from models.user import User, UserRole
from models.seller import Seller
from models.buyer import Buyer
from sqlalchemy.orm import sessionmaker
from connectors.sql_connector import engine
from flask_login import login_required, current_user
from schemas.user_schema import UserSchema, get_schema_for_role
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

user_bp = Blueprint('users', __name__, url_prefix='/users')

@user_bp.route("/", methods=['POST'])
def create_user():
    data = request.get_json()
    role = data.get('role')
    
    # Validate the role
    if role not in UserRole.__members__:
        return jsonify({"error": "Invalid role provided"}), 400
    
    # Get the schema based on the role
    schema = get_schema_for_role(role)
    
    try:
        # Validate and deserialize input data
        validated_data = schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    # Create the User instance
    user = User(
        name=validated_data['name'],
        email=validated_data['email'],
        address=validated_data.get('address'),
        phone_number=validated_data.get('phone_number'),
        role=validated_data['role'],
        profile_picture_url=validated_data.get('profile_picture_url')
    )
    
    # Set the hashed password
    user.set_password(validated_data['password'])
    
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            session.add(user)
            session.commit()
            user_id = user.id
            if role == UserRole.seller.value:
                # Create and add Seller instance
                seller = Seller(
                    user_id=user.id,  # Foreign key reference
                    farm_name=validated_data['farm_name'],
                    farm_location=validated_data.get('farm_location'),
                    bio=validated_data.get('bio')
                )
                session.add(seller)
            elif role == UserRole.buyer.value:
                # Create and add Buyer instance
                buyer = Buyer(
                    user_id=user.id  # Foreign key reference
                )
                session.add(buyer)
            session.commit()
            if role == UserRole.seller.value:
                return jsonify({"message": "Seller created successfully!"}), 201
            elif role == UserRole.buyer.value:
                return jsonify({"message": "Buyer created successfully!"}), 201
    except IntegrityError as e:
        session.rollback()
        if '1062' in str(e.orig):  # Check for MySQL duplicate entry error code
            return jsonify({'error': 'Duplicate entry detected: email already exists'}), 409
        return jsonify({'error': 'An error occurred'}), 500
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500