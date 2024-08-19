from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, func
from sqlalchemy.orm import relationship
from models.base import Base
from models.product import Product
from models.buyer import Buyer
from datetime import datetime

class Review(Base):
    __tablename__ = 'review'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    buyer_id = Column(Integer, ForeignKey('buyer.id', ondelete='CASCADE'), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    review_date = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    product = relationship('Product', back_populates='reviews')
    buyer = relationship('Buyer', back_populates='reviews')
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'buyer_id': self.buyer_id,
            'rating': self.rating,
            'comment': self.comment,
             'review_date': self.review_date.isoformat() if isinstance(self.review_date, datetime) else self.review_date}
