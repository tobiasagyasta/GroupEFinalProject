from sqlalchemy import Column, Integer, String, Text, ForeignKey, event
from sqlalchemy.orm import relationship
from models.base import Base
import enum

class Seller(Base):
    __tablename__ = 'seller'

    id = Column(Integer, primary_key=True, autoincrement=True)  # Unique ID for Seller
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False, index = True)  # Foreign key to User
    farm_name = Column(String(255), nullable=False)
    farm_location = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    account_number = Column(String(255), nullable = True)

    # Define the relationship back to the User model
    user = relationship('User', back_populates='sellers')
    products = relationship('Product', back_populates='seller', lazy='dynamic')
    order_items = relationship('OrderItem', back_populates= 'seller')

    def __repr__(self):
        return f"<Seller(id={self.id}, farm_name={self.farm_name}, farm_location={self.farm_location}, bio={self.bio})>"
