from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker
from models.review import Review
from connectors.sql_connector import engine

review_bp = Blueprint('review_bp', __name__, url_prefix='/review')

@review_bp.route('/', methods=['POST'])
def create_review():
    data = request.get_json()
    Session = sessionmaker(bind=engine)
    with Session() as session:
        # Ensure required fields are present
        if not all(key in data for key in ('product_id', 'buyer_id', 'rating', 'comment')):
            return jsonify({'message': 'Missing required fields'}), 400

        new_review = Review(
            product_id=data['product_id'],
            buyer_id=data['buyer_id'],
            rating=data['rating'],
            comment=data['comment'],
        )
        session.add(new_review)
        session.commit()
        return jsonify(new_review.to_dict()), 201