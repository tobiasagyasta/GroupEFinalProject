import re
from marshmallow import ValidationError

def validate_email(email):
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        raise ValidationError("Invalid email format!")

def validate_password(password):
    if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$', password):
        raise ValidationError("Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, and one number.")