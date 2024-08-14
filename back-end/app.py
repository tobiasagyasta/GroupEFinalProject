from flask import Flask, jsonify
from flask_login import LoginManager
from connectors.sql_connector import engine, get_connection
from sqlalchemy.orm import sessionmaker
import os
from models.user import User
from controllers.auth_controller import auth_bp
from controllers.user_controller import user_bp
from controllers.image_upload_controller import upload_bp
from models.seller import Seller
from flask_cors import CORS


app = Flask(__name__, static_folder='public')
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
app.json.sort_keys = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

UPLOAD_FOLDER = 'public/images/'  # Define your public folder here
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(upload_bp)

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

from flask import Flask, jsonify, request

@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

if __name__ == "__main__":
    app.run(debug=True)