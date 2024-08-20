from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.product import Product
from connectors.sql_connector import engine


product_bp = Blueprint('product_bp', __name__, url_prefix='/product')

@product_bp.route('/', methods=['GET'])
def get_products():
    """Retrieve all products with pagination, optional category filtering, and price sorting."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Get pagination parameters from query string, default to page 1 and 10 items per page
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        
        # Get category filter from query string, default to None
        category = request.args.get('category', default=None, type=str)
        
        # Get sort order from query string, default to ascending ('asc')
        sort_order = request.args.get('sort_order', default='desc', type=str).lower()
        
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Build query with optional category filter
        query = session.query(Product)
        if category:
            query = query.filter(Product.category == category)
        
        # Add sorting by price
        if sort_order == 'desc':
            query = query.order_by(Product.price.desc())
        else:
            query = query.order_by(Product.price.asc())
        
        # Execute query with pagination
        products = query.offset(offset).limit(per_page).all()
        
        # Get total count of products for pagination metadata
        total_products_query = session.query(Product)
        if category:
            total_products_query = total_products_query.filter(Product.category == category)
        total_products = total_products_query.count()
        
        # Prepare response data
        response = {
            'total': total_products,
            'page': page,
            'per_page': per_page,
            'sort_order': sort_order,
            'products': [product.to_dict() for product in products]
        }
        
        return jsonify(response), 200

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
