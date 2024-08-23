from sqlalchemy import Column, Integer, ForeignKey, String, Text, Numeric, Enum, DateTime
from sqlalchemy.orm import relationship
from models.base import Base
from models.seller import Seller
import enum
from sqlalchemy.sql import func

class ProductStatus(enum.Enum):
    available = 'available'
    inactive = 'inactive'

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    seller_id = Column(Integer, ForeignKey('seller.id', ondelete='SET NULL'), nullable=True)
    name = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    status = Column(Enum(ProductStatus), nullable=False, default = 'available')
    product_picture_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    seller = relationship('Seller', back_populates='products')
    reviews = relationship('Review', back_populates='product',  primaryjoin='Product.id == Review.product_id')
    cart_items = relationship('CartItem', back_populates='product')
    favorites = relationship("Favorite", back_populates="product", uselist=False, cascade='all, delete-orphan')
    order_items = relationship('OrderItem', back_populates= 'product')
    
    def to_dict(self):
        """Convert the Product object to a dictionary."""
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': float(self.price),  # Convert Decimal to float for JSON serialization
            'quantity': self.quantity,
            'unit': self.unit,
            'status': self.status.value,  # Convert Enum to its value
            'product_picture_url': self.product_picture_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'time_updated': self.time_updated.isoformat() if self.time_updated else None
        }