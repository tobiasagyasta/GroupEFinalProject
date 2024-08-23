from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.cart import Cart
from models.order import Order
from models.order_item import OrderItem
from models.cart_item import CartItem
from models.product import Product
from connectors.sql_connector import engine

order_bp = Blueprint('order_bp', __name__, url_prefix='/order')

@order_bp.route('/checkout', methods=['POST'])
def checkout():
    cart_id = request.json.get('cart_id')
    buyer_id = request.json.get('buyer_id')
    payment_method = request.json.get('payment_method', 'bank_transfer')

    if not cart_id or not buyer_id:
        return jsonify({'message': 'Cart ID and Buyer ID are required'}), 400

    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Retrieve the cart and its items
        cart = session.query(Cart).get(cart_id)
        if not cart:
            return jsonify({'message': 'Cart not found'}), 404
        
        # Fetch product prices for the items in the cart
        product_ids = [item.product_id for item in cart.cart_items]
        products = session.query(Product).filter(Product.id.in_(product_ids)).all()
        product_dict = {product.id: product.price for product in products}
        
        # Calculate total price
        total_price = sum(product_dict[item.product_id] * item.quantity for item in cart.cart_items)

        # Create a new order
        order = Order(
            buyer_id=buyer_id,
            total_price=total_price,
            payment_method=payment_method
        )
        session.add(order)
        session.commit()

        # Add cart items to the order
        order_items = [OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity) for item in cart.cart_items]
        session.add_all(order_items)
        session.commit()

        # Delete the cart after the order is created
        session.delete(cart)
        session.commit()

        return jsonify({'message': 'Order created successfully', 'order_id': order.id}), 201
    
    
@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Retrieve the order by ID
        order = session.query(Order).get(order_id)
        if not order:
            return jsonify({'message': 'Order not found'}), 404

        # Retrieve the order items associated with the order
        order_items = session.query(OrderItem).filter_by(order_id=order.id).all()

        # Retrieve product details for each order item
        product_ids = [item.product_id for item in order_items]
        products = session.query(Product).filter(Product.id.in_(product_ids)).all()
        product_dict = {product.id: product for product in products}

        # Prepare the order details
        order_data = {
            'order_id': order.id,
            'buyer_id': order.buyer_id,
            'total_price': order.total_price,
            'payment_method': order.payment_method,
            'order_date': order.order_date,
            'items': [
                {
                    'product_id': item.product_id,
                    'product_name': product_dict[item.product_id].name,
                    'quantity': item.quantity,
                    'price': product_dict[item.product_id].price,
                    'product_picture_url':  product_dict[item.product_id].product_picture_url
                }
                for item in order_items
            ]
        }

        return jsonify(order_data), 200