from sqlalchemy import event
from sqlalchemy.orm import sessionmaker
from models.seller import Seller
from models.product import Product
from connectors.sql_connector import engine

@event.listens_for(Seller, 'before_delete')
def mark_products_inactive(mapper, connection, target):
    """Mark all products of a seller as inactive before deleting the seller."""
    Session = sessionmaker(bind=engine)
    session = Session()
    session.query(Product).filter_by(seller_id=target.id).update({"status": "inactive"})
    session.commit()
