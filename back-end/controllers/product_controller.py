from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.product import Product
from connectors.sql_connector import engine


product_bp = Blueprint('product_bp', __name__, url_prefix='/product')

@product_bp.route('/', methods=['GET'])
def get_products():
    """Retrieve all products."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        products = session.query(Product).all()
        return jsonify([product.to_dict() for product in products]), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieve a single product by ID."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        product = session.query(Product).get(product_id)
        if product:
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({'message': 'Product not found'}), 404

@product_bp.route('/', methods=['POST'])
def create_product():
    """Create a new product."""
    data = request.get_json()
    Session = sessionmaker(bind=engine)
    with Session() as session:
        new_product = Product(**data)
        session.add(new_product)
        session.commit()
        return jsonify(new_product.to_dict()), 201

@product_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update an existing product."""
    data = request.get_json()
    Session = sessionmaker(bind=engine)
    with Session() as session:
        product = session.query(Product).get(product_id)
        if product:
            for key, value in data.items():
                setattr(product, key, value)
            session.commit()
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({'message': 'Product not found'}), 404

@product_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        product = session.query(Product).get(product_id)
        if product:
            session.delete(product)
            session.commit()
            return jsonify({'message': 'Product deleted'}), 204
        else:
            return jsonify({'message': 'Product not found'}), 404
