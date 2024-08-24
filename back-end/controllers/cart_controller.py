from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker, joinedload
from models.cart import Cart
from models.cart_item import CartItem
from models.product import Product
from connectors.sql_connector import engine

cart_bp = Blueprint('cart_bp', __name__, url_prefix='/cart')

@cart_bp.route('/create', methods=['POST'])
def create_cart():
    buyer_id = request.json.get('buyer_id')
    
    if not buyer_id:
        return jsonify({'message': 'Buyer ID is required'}), 400
    
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Check if the buyer already has an existing cart
        existing_cart = session.query(Cart).filter_by(buyer_id=buyer_id).first()
        
        if existing_cart:
            return jsonify({'message': 'Buyer already has an existing cart'}), 400
        
        # If no existing cart, create a new cart
        new_cart = Cart(buyer_id=buyer_id)
        session.add(new_cart)
        session.commit()
        
        return jsonify({'message': 'Cart created successfully', 'cart_id': new_cart.id}), 201

@cart_bp.route('/<int:cart_id>/add_item', methods=['POST'])
def add_item_to_cart(cart_id):
    """Add an item to a cart or update the quantity if it already exists."""
    product_id = request.json.get('product_id')
    quantity = request.json.get('quantity', 1)

    if not product_id:
        return jsonify({'message': 'Product ID is required'}), 400

    Session = sessionmaker(bind=engine)
    with Session() as session:
        cart = session.query(Cart).get(cart_id)
        if not cart:
            return jsonify({'message': 'Cart not found'}), 404
        
        product = session.query(Product).get(product_id)
        if not product:
            return jsonify({'message': 'Product not found'}), 404

        # Check if the item already exists in the cart
        existing_cart_item = session.query(CartItem).filter_by(cart_id=cart_id, product_id=product_id).first()

        if existing_cart_item:
            # Update the quantity if the item exists
            existing_cart_item.quantity += quantity
            session.commit()
            return jsonify({'message': 'Item quantity updated', 'product_id': existing_cart_item.id}), 200
        else:
            # Create a new cart item if it doesn't exist
            cart_item = CartItem(
                cart_id=cart_id,
                product_id=product_id,
                quantity=quantity
            )
            session.add(cart_item)
            session.commit()
            return jsonify({'message': 'Item added to cart', 'product_id': cart_item.id}), 201


@cart_bp.route('/<int:cart_id>', methods=['GET'])
def get_cart(cart_id):
    """Retrieve the details of a cart."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Query the Cart to check if it exists
        cart = session.query(Cart).get(cart_id)
        if not cart:
            return jsonify({'message': 'Cart not found'}), 404

        # Query the CartItem and join with the Product table
        cart_items = session.query(CartItem).join(CartItem.product).options(joinedload(CartItem.product)).filter(CartItem.cart_id == cart_id).all()
        
        # Prepare the cart data with product details including picture URL
        items = [
            {
                'cart_item_id': item.id,
                'product_id': item.product.id,
                'product_name': item.product.name,
                'product_picture_url': item.product.product_picture_url,
                'quantity': item.quantity
            }
            for item in cart_items
        ]
        
        return jsonify({
            'cart_id': cart.id,
            'buyer_id': cart.buyer_id,
            'created_at': cart.created_at,
            'updated_at': cart.updated_at,
            'items': items
        }), 200

@cart_bp.route('/<int:cart_id>/remove_item/<int:product_id>', methods=['DELETE'])
def remove_item_from_cart(cart_id, product_id):
    """Remove an item from the cart."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Query to find the CartItem with the given cart_id and product_id
        cart_item = session.query(CartItem).filter_by(cart_id=cart_id, product_id=product_id).first()
        if not cart_item:
            return jsonify({'message': 'Cart item not found or does not belong to this cart'}), 404
        
        session.delete(cart_item)
        session.commit()
        
        return jsonify({'message': 'Item removed from cart'}), 204

@cart_bp.route('/<int:cart_id>', methods=['DELETE'])
def delete_cart(cart_id):
    """Delete a cart and all its items."""
    Session = sessionmaker(bind=engine)
    with Session() as session:
        cart = session.query(Cart).get(cart_id)
        if not cart:
            return jsonify({'message': 'Cart not found'}), 404
        
        # Delete all items in the cart
        session.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
        # Delete the cart itself
        session.delete(cart)
        session.commit()
        
        return jsonify({'message': 'Cart deleted'}), 204
    
@cart_bp.route('/buyer/<int:buyer_id>', methods=['GET'])
def get_cart_by_buyer_id(buyer_id):
    """Retrieve the cart ID based on the buyer ID."""
    Session = sessionmaker(bind=engine)
    
    with Session() as session:
        # Query the cart associated with the buyer ID
        cart = session.query(Cart).filter_by(buyer_id=buyer_id).first()
        
        if cart:
            return jsonify({'cart_id': cart.id}), 200
        else:
            return jsonify({'message': 'No cart found for this buyer'}), 404
        
        
@cart_bp.route('/<int:cart_id>/update_items', methods=['PUT'])
def update_cart_items(cart_id):
    """Update the quantities of items in the cart."""
    items = request.json.get('items', [])
    
    if not items:
        return jsonify({'message': 'No items provided'}), 400

    Session = sessionmaker(bind=engine)
    with Session() as session:
        cart = session.query(Cart).get(cart_id)
        if not cart:
            return jsonify({'message': 'Cart not found'}), 404
        
        # Loop through items and update quantities
        for item in items:
            cart_item = session.query(CartItem).filter_by(cart_id=cart_id, product_id=item['product_id']).first()
            if cart_item:
                cart_item.quantity = item['quantity']
        
        session.commit()
        return jsonify({'message': 'Cart updated successfully'}), 200
