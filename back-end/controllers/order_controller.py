from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.cart import Cart
from models.order import Order
from models.order_item import OrderItem
from models.cart_item import CartItem
from models.product import Product
from models.seller import Seller  # Ensure Seller model is imported
from models.buyer import Buyer
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
        
        # Fetch product details for the items in the cart
        cart_items = session.query(CartItem).filter(CartItem.cart_id == cart_id).all()
        product_ids = [item.product_id for item in cart_items]
        products = session.query(Product).filter(Product.id.in_(product_ids)).all()
        product_dict = {product.id: product for product in products}
        
        # Calculate total price
        total_price = sum(product_dict[item.product_id].price * item.quantity for item in cart_items)

        # Create a new order
        order = Order(
            buyer_id=buyer_id,
            total_price=total_price,
            payment_method=payment_method
        )
        session.add(order)
        session.commit()

        # Add cart items to the order, including seller_id
        order_items = []
        for item in cart_items:
            product = product_dict.get(item.product_id)
            if product:
                order_item = OrderItem(
                    order_id=order.id,
                    product_id=item.product_id,
                    quantity=item.quantity,
                    seller_id=product.seller_id  # Set seller_id from Product
                )
                order_items.append(order_item)
        
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
            'status': order.status,
            'items': [
                {
                    'product_id': item.product_id,
                    'seller_id': product_dict[item.product_id].seller_id,
                    'product_name': product_dict[item.product_id].name,
                    'quantity': item.quantity,
                    'price': product_dict[item.product_id].price,
                    'product_picture_url': product_dict[item.product_id].product_picture_url
                }
                for item in order_items
            ],
            'transaction_id': order.transaction_id
        }

        return jsonify(order_data), 200
@order_bp.route('/<int:order_id>/status', methods=['PATCH'])
def update_order_status(order_id):
    # Retrieve the new status from the request body
    new_status = request.json.get('status')
    
    # Validate the new status
    valid_statuses = ['pending', 'processing', 'accepted', 'shipped', 'cancelled']
    if new_status not in valid_statuses:
        return jsonify({'message': 'Invalid status value'}), 400

    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Retrieve the order by ID
        order = session.query(Order).get(order_id)
        if not order:
            return jsonify({'message': 'Order not found'}), 404

        # Update the order status
        order.status = new_status
        session.commit()

        return jsonify({'message': 'Order status updated successfully', 'order_id': order.id, 'new_status': new_status}), 200

@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_orders_by_user(user_id):
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Retrieve all orders for the given user ID
        orders = (
            session.query(Order)
            .join(Buyer, Order.buyer_id == Buyer.id)
            .filter(Buyer.user_id == user_id)
            .all()
        )
        
        if not orders:
            return jsonify({'message': 'No orders found for this user'}), 404
        
        # Prepare the orders details
        orders_data = []
        for order in orders:
            # Retrieve the order items associated with the order
            order_items = session.query(OrderItem).filter_by(order_id=order.id).all()

            # Retrieve product details for each order item
            product_ids = [item.product_id for item in order_items]
            products = session.query(Product).filter(Product.id.in_(product_ids)).all()
            product_dict = {product.id: product for product in products}

            # Get the actual user ID
            user_id = order.buyer.user_id

            # Prepare the order details
            order_data = {
                'order_id': order.id,
                'user_id': user_id,  # Use the actual user_id value
                'total_price': float(order.total_price),
                'payment_method': order.payment_method,
                'order_date': order.order_date.isoformat(),  # Convert datetime to ISO format
                'status': order.status,
                'items': [
                    {
                        'product_id': item.product_id,
                        'seller_id': product_dict[item.product_id].seller_id,
                        'product_name': product_dict[item.product_id].name,
                        'quantity': item.quantity,
                        'price': float(product_dict[item.product_id].price),
                        'product_picture_url': product_dict[item.product_id].product_picture_url
                    }
                    for item in order_items
                ],
                'transaction_id': order.transaction_id
            }
            orders_data.append(order_data)
        
        return jsonify({'orders': orders_data}), 200
    
@order_bp.route('/seller/<int:seller_id>', methods=['GET'])
def get_orders_by_seller(seller_id):
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Query for order items that are associated with the given seller_id
        order_items = (
            session.query(OrderItem)
            .join(Product, OrderItem.product_id == Product.id)
            .filter(Product.seller_id == seller_id)
            .all()
        )
        
        if not order_items:
            return jsonify({'message': 'No orders found for this seller'}), 404
        
        # Collect order IDs related to this seller
        order_ids = {item.order_id for item in order_items}
        
        # Fetch orders using the collected order IDs
        orders = session.query(Order).filter(Order.id.in_(order_ids)).all()
        
        # Prepare the orders data
        orders_data = []
        for order in orders:
            # Retrieve the order items for the current order
            items = [
                {
                    'product_id': item.product_id,
                    'product_name': item.product.name,
                    'quantity': item.quantity,
                    'price': float(item.product.price),
                    'product_picture_url': item.product.product_picture_url
                }
                for item in order_items if item.order_id == order.id
            ]
            
            # Prepare order details
            order_data = {
                'order_id': order.id,
                'buyer_id': order.buyer_id,
                'total_price': float(order.total_price),
                'payment_method': order.payment_method,
                'order_date': order.order_date.isoformat(),
                'status': order.status,
                'items': items,
                'transaction_id': order.transaction_id
            }
            orders_data.append(order_data)
        
        return jsonify({'orders': orders_data}), 200
