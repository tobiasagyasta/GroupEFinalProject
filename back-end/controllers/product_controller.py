from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.product import Product
from connectors.sql_connector import engine
from models.seller import Seller


product_bp = Blueprint('product_bp', __name__, url_prefix='/product')

@product_bp.route('/', methods=['GET'])
def get_products():
    """Retrieve all products with pagination, optional category filtering, search, and price sorting."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Get pagination parameters from query string, default to page 1 and 10 items per page
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        
        # Get filters from query string
        category = request.args.get('category', default=None, type=str)
        search = request.args.get('search', default=None, type=str)  # New search parameter
        sort_order = request.args.get('sort_order', default='desc', type=str).lower()
        
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Build query with optional category filter and search filter
        query = session.query(Product)
        if category:
            query = query.filter(Product.category == category)
        if search:
            query = query.filter(Product.name.ilike(f'%{search}%'))  # Case-insensitive search
        
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
        if search:
            total_products_query = total_products_query.filter(Product.name.ilike(f'%{search}%'))
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

@product_bp.route('/post', methods=['POST'])
def create_product():
    """Create a new product."""
    # Get form data
    
    seller_id = request.json.get('seller_id')
    name = request.json.get('name')
    price = request.json.get('price')
    description = request.json.get('description')
    unit = request.json.get('unit')
    quantity = request.json.get('quantity')
    product_picture_url = request.json.get('product_picture_url')
    category = request.json.get('category')

    # Create new product instance
    Session = sessionmaker(bind=engine)
    with Session() as session:
        new_product = Product(
            seller_id = seller_id,
            name=name,
            price=price,
            description=description,
            unit=unit,
            quantity=quantity,
            product_picture_url=product_picture_url,
            category = category,
        )
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
        
@product_bp.route('/by_user/<int:user_id>', methods=['GET'])
def get_products_by_user(user_id):
    """Retrieve all products by user ID, with optional filtering by category, price, quantity, and sorting."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Retrieve the seller ID for the given user ID
        seller = session.query(Seller).filter(Seller.user_id == user_id).first()
        if not seller:
            return jsonify({'message': 'Seller not found for the provided user ID'}), 404
        
        seller_id = seller.id
        
        # Get pagination parameters from query string, default to page 1 and 10 items per page
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        
        # Get filters from query string
        category = request.args.get('category', default=None, type=str)
        search = request.args.get('search', default=None, type=str)  # Search parameter
        
        # Get sort parameters from query string
        sort_by = request.args.get('sort_by', default='price', type=str).lower()  # 'price' or 'quantity'
        sort_order = request.args.get('sort_order', default='desc', type=str).lower()  # 'asc' or 'desc'
        
        # Calculate offset
        offset = (page - 1) * per_page
        
        # Build query to filter products by seller ID
        query = session.query(Product).filter(Product.seller_id == seller_id)
        
        # Apply category filter
        if category:
            query = query.filter(Product.category == category)
        
        # Apply search filter (case-insensitive)
        if search:
            query = query.filter(Product.name.ilike(f'%{search}%'))
        
        # Apply sorting
        if sort_by == 'price':
            if sort_order == 'desc':
                query = query.order_by(Product.price.desc())
            else:
                query = query.order_by(Product.price.asc())
        elif sort_by == 'quantity':
            if sort_order == 'desc':
                query = query.order_by(Product.quantity.desc())
            else:
                query = query.order_by(Product.quantity.asc())
        
        # Execute query with pagination
        products = query.offset(offset).limit(per_page).all()
        
        # Get total count of filtered products for pagination metadata
        total_products_query = session.query(Product).filter(Product.seller_id == seller_id)
        
        if category:
            total_products_query = total_products_query.filter(Product.category == category)
        if search:
            total_products_query = total_products_query.filter(Product.name.ilike(f'%{search}%'))
        
        total_products = total_products_query.count()
        
        # Prepare response data
        response = {
            'total': total_products,
            'page': page,
            'per_page': per_page,
            'sort_by': sort_by,
            'sort_order': sort_order,
            'products': [product.to_dict() for product in products]
        }
        
        return jsonify(response), 200

@product_bp.route('/', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'Options request'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@product_bp.route('/<int:product_id>/seller', methods=['GET'])
def get_seller_info_by_product(product_id):
    """Get seller info by product ID."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Query the product by ID
        product = session.query(Product).get(product_id)
        
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        # Get the associated seller
        seller = product.seller
        
        if not seller:
            return jsonify({'message': 'Seller not found for this product'}), 404
        
        # Get the associated user
        user = seller.user
        
        if not user:
            return jsonify({'message': 'User not found for this seller'}), 404
        
        # Prepare the response data
        seller_info = {
            'seller_id': seller.id,
            'farm_name': seller.farm_name,
            'farm_location': seller.farm_location,
            'bio': seller.bio,
            'user_name': user.name,
            'user_email': user.email,
            'user_phone': user.phone_number,
            'profile_picture_url': user.profile_picture_url
        }
        
        return jsonify(seller_info), 200