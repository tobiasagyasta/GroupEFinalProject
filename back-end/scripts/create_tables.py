import json
import sys
import os
from datetime import datetime

# Get the parent directory of the current script
current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to PYTHONPATH
sys.path.append(parent_dir)  

from models.base import Base
from models.user import User, UserRole
from models.seller import Seller
from models.buyer import Buyer
from models.product import Product
from models.review import Review
from models.cart import Cart
from models.cart_item import CartItem
from sqlalchemy.orm import sessionmaker
from connectors.sql_connector import engine

# Create the tables
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Load product data from JSON file
def load_products_from_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

try:
    # Example data for Seller and Buyer
    seller_user = User(
        name='Bobby Johnson',
        email='bob.johnson@gmail.com',
        address='456 Maple Ave',
        phone_number='555-5678',
        role=UserRole.seller,
    )
    seller_user.set_password("Password1")
    session.add(seller_user)
    session.commit()

    seller = Seller(
        user_id=seller_user.id,
        farm_name="Green Acres",
        farm_location="123 Country Road",
        bio="We specialize in organic vegetables."
    )
    session.add(seller)
    session.commit()

    buyer_user = User(
        name='Alice Smith',
        email='alice.smith@gmail.com',
        address='789 Elm St',
        phone_number='555-1234',
        role=UserRole.buyer,
    )
    buyer_user.set_password("Password1")
    session.add(buyer_user)
    session.commit()

    buyer = Buyer(
        user_id=buyer_user.id
    )
    session.add(buyer)
    session.commit()

    # Load and insert products
    products = load_products_from_json('product_dataset.json')
    for product in products:
        new_product = Product(
    
            seller_id=product["seller_id"],
            name=product["name"],
            category=product["category"],
            description=product["description"],
            price=product["price"],
            quantity=product["quantity"],
            unit=product["unit"],
            status=product["status"],
            product_picture_url=product["product_picture_url"]
        )
        session.add(new_product)
    
    session.commit()

    print("Tables created successfully and data imported.")

except Exception as e:
    session.rollback()
    print(f"Error: {str(e)}")

finally:
    session.close()
