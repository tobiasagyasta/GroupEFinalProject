from sqlalchemy import Column, Integer, ForeignKey, DateTime
from models.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Favorite(Base):
    __tablename__ = 'favorites'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id', ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="favorites")
    product = relationship("Product", back_populates="favorites")
