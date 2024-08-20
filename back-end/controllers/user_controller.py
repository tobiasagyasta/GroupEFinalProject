from typing import final
from flask import Blueprint, request, jsonify
from models.user import User, UserRole
from models.seller import Seller
from models.buyer import Buyer
from sqlalchemy.orm import sessionmaker, joinedload
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
    finally:
        session.close()
    

@user_bp.route("/me",methods =['GET'])
@login_required
def get_current_user():
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            user = session.query(User).options(
            joinedload(User.sellers),
            joinedload(User.buyers)
        ).filter_by(id=current_user.id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "address": user.address,
            "phone_number": user.phone_number,
            "role": user.role.value,
            "profile_picture_url": user.profile_picture_url,
        }
        if user.role == UserRole.seller:
            seller = user.sellers
            if seller:
                user_data["farm_name"] = seller.farm_name
                user_data["farm_location"] = seller.farm_location
                user_data["bio"] = seller.bio
            # elif user.role == UserRole.buyer:
            #     buyer = user.buyers
            #     if buyer:
            #         user_data["buyer_id"] = buyer.id
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
        
        

@user_bp.route("/me/profile-picture/", methods=['PUT'])
@login_required
def update_profile_picture():
    data = request.get_json()
    try:
        validated_data = UserSchema(partial=True).load(data)
        if set(data.keys()) != {'profile_picture_url'}:
            return jsonify({"error": "Request data can only contain 'profile_picture_url'"}), 400
        profile_picture_url = validated_data['profile_picture_url']
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            user = session.query(User).filter_by(id=current_user.id).first()
            if not user:
                return jsonify({"error": "User not found"}), 404

            # Update the profile picture URL
            user.profile_picture_url = profile_picture_url
            session.commit()

            return jsonify({"message": "Profile picture updated successfully", "profile_picture_url": profile_picture_url}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

@user_bp.route("/me", methods=['PUT'])
@login_required
def update_user():
    data = request.get_json()
    schema = UserSchema(partial=True)
    
    try:
        validated_data = schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    validated_data.pop('profile_picture_url', None)
    
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            # Query for the current user
            user = session.query(User).filter_by(id=current_user.id).first()
            if not user:
                return jsonify({"error": "User not found"}), 404
            
            # Update the user fields if they are provided
            for key, value in validated_data.items():
                setattr(user, key, value)
            
            # Commit the changes to the database
            session.commit()
            return jsonify({"message": "User information updated successfully"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
        
@user_bp.route("/sellers/<int:id>/", methods=['GET'])
def get_seller_by_id(id):
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            # Query the Seller by ID and load related User details
            seller = session.query(Seller).options(joinedload(Seller.user)).filter(Seller.id == id).one_or_none()
            
            if seller is None:
                return jsonify({"error": "Seller not found"}), 404

            # Prepare the response
            response = {
                "id": seller.id,
                "farm_name": seller.farm_name,
                "farm_location": seller.farm_location,
                "bio": seller.bio,
                "user": {
                    "id": seller.user.id,
                    "name": seller.user.name,
                    "email": seller.user.email,
                    "phone_number": seller.user.phone_number,
                    "profile_picture_url": seller.user.profile_picture_url
                }
            }
            
            return jsonify(response), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()