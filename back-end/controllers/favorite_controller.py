from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker
from models.user import User
from models.favorite import Favorite
from models.product import Product
from connectors.sql_connector import engine

favorites_bp = Blueprint('favorites', __name__, url_prefix='/favorites')

@favorites_bp.route('/', methods=['POST'])
@login_required
def add_favorite():
    data = request.get_json()
    product_id = data.get('product_id')
    user_id = data.get('user_id')

    if not product_id or not user_id:
        return jsonify({"error": "Product ID and User ID are required"}), 400

    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            # Ensure the product exists
            product = session.query(Product).get(product_id)
            if not product:
                return jsonify({"error": "Product not found"}), 404

            # Check if the favorite already exists
            existing_favorite = session.query(Favorite).filter_by(user_id=user_id, product_id=product_id).first()
            if existing_favorite:
                return jsonify({"message": "Product is already in favorites"}), 409

            # Add the favorite
            favorite = Favorite(user_id=user_id, product_id=product_id)
            session.add(favorite)
            session.commit()
            return jsonify({"message": "Product added to favorites"}), 201
    except IntegrityError:
        session.rollback()
        return jsonify({"error": "Could not add favorite"}), 500
    finally:
        session.close()

@favorites_bp.route('/<int:user_id>', methods=['GET'])
@login_required
def get_favorites(user_id):
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            favorites = session.query(Favorite).join(Product).filter(Favorite.user_id == user_id).all()
            favorite_products = [
                {
                    "product_id": favorite.product.id,
                    "product_name": favorite.product.name,
                    "price": favorite.product.price,
                    "product_picture_url": favorite.product.product_picture_url,
             
                }
                for favorite in favorites
            ]
            return jsonify(favorite_products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

@favorites_bp.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_favorite(product_id):
    Session = sessionmaker(bind=engine)
    try:
        with Session() as session:
            favorite = session.query(Favorite).filter_by(user_id=current_user.id, product_id=product_id).first()
            if not favorite:
                return jsonify({"error": "Favorite not found"}), 404

            session.delete(favorite)
            session.commit()
            return jsonify({"message": "Product removed from favorites"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
