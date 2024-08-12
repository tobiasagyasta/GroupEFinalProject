from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base import Base

class Buyer(Base):
    __tablename__ = 'buyer'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    
    # Define the relationship to the User model
    user = relationship('User', back_populates='buyers')

    def __repr__(self):
        return f"<Buyer(id={self.id}, user_id={self.user_id})>"
