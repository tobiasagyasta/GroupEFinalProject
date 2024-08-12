from models.base import Base
from models.buyer import Buyer
from models.seller import Seller
from sqlalchemy import Column, Integer, VARCHAR, Enum, DateTime
from sqlalchemy.orm import  relationship
from sqlalchemy.sql import func
import bcrypt
from flask_login import UserMixin
import enum

class UserRole(enum.Enum):
    seller = 'seller'
    buyer = 'buyer'

class User(Base, UserMixin):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(255), nullable=False)
    email = Column(VARCHAR(255), unique=True, nullable=False)
    password_hash = Column(VARCHAR(255), nullable=False)
    address = Column(VARCHAR(255))
    phone_number = Column(VARCHAR(255))
    role = Column(Enum(UserRole), nullable=False)
    profile_picture_url = Column(VARCHAR(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

    # Example of a relationship if there are related tables
    sellers = relationship('Seller', back_populates='user', uselist=False, cascade='all, delete-orphan')
    buyers = relationship('Buyer', back_populates='user', uselist=False, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def __repr__(self):
        return f"<User(name={self.name}, email={self.email}, role={self.role})>"
