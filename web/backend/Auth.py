from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, 
                                create_refresh_token, 
                                jwt_required, 
                                jwt_refresh_token_required, 
                                get_jwt_identity, 
                                get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument('pwd', help = 'This field cannot be blank', required = True)

admin_password = "superpuper"

class AdminLogin(Resource):
    def post(self):
        data = parser.parse_args()
        pwd = data['pwd']
        
        if pwd == admin_password:
            access_token = create_access_token(identity = 'admin')
            refresh_token = create_refresh_token(identity = 'admin')
            return {
                'access_token': access_token,
                'refresh_token': refresh_token
                }
        else:
            return {"error": "Invalid credentials"}

class CheckIfTokenExpire(Resource):
    @jwt_required
    def post(self):
        return {"success": True}

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}
