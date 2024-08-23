from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship, column_property
from sqlalchemy.sql import select
from models.base import Base
from models.product import Product

class OrderItem(Base):
    __tablename__ = 'order_item'

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey('order.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    seller_id = Column(Integer, ForeignKey('seller.id'), nullable=True)  

    # Relationships to the Order and Product models
    order = relationship('Order', back_populates='order_items')
    product = relationship('Product', back_populates='order_items')
    seller = relationship('Seller', back_populates='order_items')  # Relationship to Seller

    def __repr__(self):
        return (f"<OrderItem(id={self.id}, order_id={self.order_id}, product_id={self.product_id}, "
                f"quantity={self.quantity}, seller_id={self.seller_id})>")
