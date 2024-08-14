from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.user import User
from flask_login import login_user, logout_user, login_required, current_user
from connectors.sql_connector import engine

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password') 
    Session = sessionmaker(bind=engine)
    with Session() as session:
        user = session.query(User).filter_by(email= email).first()
        if user and user.check_password(password):
            login_user(user)
            # print(current_user.role.value)
            return jsonify({'message': 'Login successful', "id": user.id}), 200
        else:
            return jsonify({'message': 'Invalid credentials! Please try again.'}), 401

@auth_bp.route('/logout', methods=['GET'])
@login_required
def logout():
    if not current_user.is_authenticated:
        return jsonify({"error": "You have already logged out!"}), 401
    logout_user()
    return jsonify({'message': 'Log out successful'}), 200