from flask import Flask, jsonify
from flask_login import LoginManager
from connectors.sql_connector import engine, get_connection
from sqlalchemy.orm import sessionmaker
import os
from models.user import User
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from models.seller import Seller

app = Flask(__name__)
app.json.sort_keys = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth_bp.login'

@login_manager.user_loader
def load_user(user_id):
    Session = sessionmaker(bind = engine)
    session = Session()
    return session.query(User).get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized_callback():
    return 'Unauthorized access, try again!', 401

@app.route("/")
def welcome():
    # Session = sessionmaker(bind=engine)
    # session = Session()

    # # Query to join User and Seller tables
    # query = session.query(User, Seller).join(Seller, User.id == Seller.user_id)

    # # Execute the query and fetch results
    # results = query.all()

    # # Iterate and print results
    # for user, seller in results:
    #     print(f"User: {user.name}, Email: {user.email}")
    #     print(f"Seller: Farm Name: {seller.farm_name}, Location: {seller.farm_location}, Bio: {seller.bio}")

    # session.close()
    return jsonify({"message": "Welcome to our API!"})

if __name__ == "__main__":
    app.run(debug=True)