from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from models.base import Base

class Seller(Base):
    __tablename__ = 'seller'

    id = Column(Integer, primary_key=True, autoincrement=True)  # Unique ID for Seller
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False, index = True)  # Foreign key to User
    farm_name = Column(String(255), nullable=False)
    farm_location = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)

    # Define the relationship back to the User model
    user = relationship('User', back_populates='sellers')

    def __repr__(self):
        return f"<Seller(id={self.id}, farm_name={self.farm_name}, farm_location={self.farm_location}, bio={self.bio})>"
