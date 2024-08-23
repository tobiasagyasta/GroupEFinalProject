from sqlalchemy import Column, Integer, ForeignKey, String, Enum, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from models.base import Base
from models.order_item import OrderItem
import secrets
import string

# Function to generate a random alphanumeric code
def generate_transaction_code(length=10) -> str:
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

class Order(Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True, autoincrement=True)
    buyer_id = Column(Integer, ForeignKey('buyer.id'), nullable=False, index=True)
    order_date = Column(DateTime(timezone=True), server_default=func.now())
    total_price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(Enum('pending', 'processing', 'accepted', 'shipped', 'cancelled', name='order_status'), nullable=False, default='pending')
    payment_method = Column(
        Enum('credit_card', 'debit_card', 'paypal', 'bank_transfer', name='payment_method'), 
        nullable=False, 
        default='bank_transfer'  
    )
    transaction_id = Column(String(10), unique=True, nullable=False, default=generate_transaction_code) 

    # Store cart items directly in the order
    order_items = relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    # Define the relationship to the Buyer model
    buyer = relationship('Buyer', back_populates='orders')

    def __repr__(self):
        return (f"<Order(id={self.id}, buyer_id={self.buyer_id}, order_date={self.order_date}, "
                f"total_price={self.total_price}, status={self.status}, payment_method={self.payment_method}, "
                f"transaction_id={self.transaction_id})>")
