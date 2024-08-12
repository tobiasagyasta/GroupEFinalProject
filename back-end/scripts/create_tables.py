# setup_database.py
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
from sqlalchemy.orm import sessionmaker
from connectors.sql_connector import engine

# Create the tables
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

try:
    # Example data for Seller
    seller_user = User(
        name='Bobby Johnson',
        email='bob.johnson@example.com',
        address='456 Maple Ave',
        phone_number='555-5678',
        role=UserRole.seller, 
        profile_picture_url='https://avatar.iran.liara.run/public/boy'
    )
    seller_user.set_password("password")
    session.add(seller_user)
    session.commit()

    seller = Seller(
        
        user_id=seller_user.id,  # This should match the User id
        farm_name="Green Acres",
        farm_location="123 Country Road",
        bio="We specialize in organic vegetables."
    )
    session.add(seller)
    session.commit()

    # Example data for Buyer
    buyer_user = User(
        name='Alice Smith',
        email='alice.smith@example.com',
        address='789 Elm St',
        phone_number='555-1234',
        role=UserRole.buyer,  # Ensure UserRole is defined
        profile_picture_url='https://avatar.iran.liara.run/public/girl'
    )
    buyer_user.set_password("password")
    session.add(buyer_user)
    session.commit()

    buyer = Buyer(
        user_id=buyer_user.id  # This should match the User id
    )
    session.add(buyer)
    session.commit()

    print("Tables created successfully and example data added.")

except Exception as e:
    session.rollback()
    print(f"Error: {str(e)}")

finally:
    session.close()
