from marshmallow import Schema, fields, ValidationError, validates
from models.user import UserRole 
from schemas.validators import validate_email, validate_password

class EnumField(fields.String):
    def __init__(self, enum_type, *args, **kwargs):
        self.enum_type = enum_type
        super().__init__(*args, **kwargs)

    def _deserialize(self, value, attr, data, **kwargs):
        if value not in self.enum_type.__members__:
            raise ValidationError(f"Invalid value '{value}' for enum.")
        return self.enum_type(value)

class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    address = fields.Str(required=True)
    phone_number = fields.Str(required=True)
    role = fields.Str(required=True, validate=lambda x: x in UserRole.__members__) 
    profile_picture_url = fields.Str()
    
    @validates('email')
    def validate_email(self, value):
        validate_email(value)

    @validates('password')
    def validate_password(self, value):
        validate_password(value)
        
class SellerSchema(UserSchema):
    farm_name = fields.Str(required=True)
    farm_location = fields.Str()
    bio = fields.Str()

    @validates('role')
    def validate_role(self, value):
        if value != UserRole.seller.value:
            raise ValidationError("Role must be 'seller' for seller schema.")
class BuyerSchema(UserSchema):
    # Buyer-specific fields can be added here if needed.
    @validates('role')
    def validate_role(self, value):
        if value != UserRole.buyer.value:
            raise ValidationError("Role must be 'buyer' for buyer schema.")
        
def get_schema_for_role(role):
    if role == UserRole.seller.value:
        return SellerSchema()
    elif role == UserRole.buyer.value:
        return BuyerSchema()
    else:
        raise ValidationError("Invalid role provided.")