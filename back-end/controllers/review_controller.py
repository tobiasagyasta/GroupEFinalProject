from flask import Blueprint, request, jsonify
from sqlalchemy.orm import sessionmaker, joinedload
from models.review import Review
from models.buyer import Buyer
from models.user import User
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

        # Check if a review by the same buyer for the same product already exists
        existing_review = session.query(Review).filter_by(
            product_id=data['product_id'],
            buyer_id=data['buyer_id']
        ).first()
        
        if existing_review:
            return jsonify({'message': 'You have already reviewed this product'}), 400

        new_review = Review(
            product_id=data['product_id'],
            buyer_id=data['buyer_id'],
            rating=data['rating'],
            comment=data['comment'],
        )
        session.add(new_review)
        session.commit()
        return jsonify(new_review.to_dict()), 201

@review_bp.route('/product/<int:product_id>', methods=['GET'])
def get_reviews_for_product(product_id):
    Session = sessionmaker(bind=engine)
    
    with Session() as session:
        # Query for all reviews associated with the given product_id
        reviews = session.query(Review).join(Buyer).join(User).filter(Review.product_id == product_id).all()
        
        if not reviews:
            return jsonify({'message': 'No reviews found for this product'}), 404

        # Convert reviews to a list of dictionaries with user information
        reviews_list = [
            {
                'id': review.id,
                'product_id': review.product_id,
                'buyer_id': review.buyer_id,
                'rating': review.rating,
                'comment': review.comment,
                'user': {
                    'name': review.buyer.user.name,
                    'profile_picture_url': review.buyer.user.profile_picture_url
                }
            } for review in reviews
        ]
        
        return jsonify(reviews_list), 200
    
@review_bp.route('/buyer/<int:buyer_id>', methods=['GET'])
def get_reviews_by_buyer(buyer_id):
    Session = sessionmaker(bind=engine)
    
    with Session() as session:
        # Query for all reviews associated with the given buyer_id
        reviews = session.query(Review).filter(Review.buyer_id == buyer_id).all()
        
        if not reviews:
            return jsonify({'message': 'No reviews found for this buyer'}), 404

        # Convert reviews to a list of dictionaries
        reviews_list = [
            {
                'id': review.id,
                'product_id': review.product_id,
                'buyer_id': review.buyer_id,
                'rating': review.rating,
                'comment': review.comment
            } for review in reviews
        ]
        
        return jsonify(reviews_list), 200
    
@review_bp.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    Session = sessionmaker(bind=engine)
    
    with Session() as session:
        # Query for the review to delete
        review = session.query(Review).filter_by(id=review_id).first()
        
        if not review:
            return jsonify({'message': 'Review not found'}), 404

        # Delete the review
        session.delete(review)
        session.commit()
        return jsonify({'message': 'Review deleted successfully'}), 200