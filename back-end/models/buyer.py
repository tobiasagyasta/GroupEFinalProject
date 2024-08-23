from sqlalchemy import Column, Integer, ForeignKey, String, Enum
from sqlalchemy.orm import relationship
from models.base import Base
from models.order import Order

class Buyer(Base):
    __tablename__ = 'buyer'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False, index=True)
    shipping_address = Column(String(255), nullable=True)
    payment_method = Column(
        Enum('credit_card', 'debit_card', 'paypal', 'bank_transfer', name='payment_method'), 
        nullable=False, 
        default='bank_transfer'  
    )

    # Define the relationship to the User model
    user = relationship('User', back_populates='buyers')
    reviews = relationship('Review', back_populates='buyer', cascade='all, delete-orphan')
    cart = relationship('Cart', uselist=False, back_populates='buyer')
    orders = relationship('Order', back_populates='buyer')

    def __repr__(self):
        return f"<Buyer(id={self.id}, user_id={self.user_id}, shipping_address={self.shipping_address}, payment_method={self.payment_method})>"
