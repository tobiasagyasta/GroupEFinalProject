from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from models.base import Base

class Cart(Base):
    __tablename__ = 'cart'

    id = Column(Integer, primary_key=True, autoincrement=True)
    buyer_id = Column(Integer, ForeignKey('buyer.id'), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationship to the Buyer model
    buyer = relationship('Buyer', back_populates='cart')
    cart_items = relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Cart(id={self.id}, buyer_id={self.buyer_id})>"
