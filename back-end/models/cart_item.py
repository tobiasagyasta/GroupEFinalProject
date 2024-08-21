from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from models.base import Base
from models.product import Product
class CartItem(Base):
    __tablename__ = 'cart_item'

    id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey('cart.id'), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)

    # Relationships to the Cart, Product, and Bundle models
    cart = relationship('Cart', back_populates='cart_items')
    product = relationship('Product')
   