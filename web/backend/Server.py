from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from DataBase.DataBaseAPI import PostContact, PostSickPerson, \
                                 PostContactToPerson, PostDisease, AddDiseaseToPerson, \
                                 GetAllDiseaseForRequiredPerson, GetPatientWithPassport, \
                                 GetPatientsWithName, GetPatientWithSurname, GetAllPatients
from web.backend.Auth import AdminLogin, TokenRefresh, CheckIfTokenExpire


class Server:
    host = str
    port = int
    app = Flask(__name__)
    api = Api(app)
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
    jwt = JWTManager(app)
    

    def __init__(self, hostVal, portVal):
        self.host = hostVal
        self.port = portVal
        self.api.add_resource(PostContact, '/postContact')
        self.api.add_resource(PostSickPerson, '/postSickPerson')
        self.api.add_resource(PostDisease, '/postDisease')
        self.api.add_resource(AddDiseaseToPerson, '/addDiseaseToPerson')
        self.api.add_resource(PostContactToPerson, '/addContactToPerson')

        self.api.add_resource(GetAllDiseaseForRequiredPerson, '/getPersonDiseases')
        self.api.add_resource(GetPatientWithPassport, '/getPatientWithPassport')
        self.api.add_resource(GetPatientsWithName, '/getPatientWithName')
        self.api.add_resource(GetPatientWithSurname, '/getPatientWithSurname')
        self.api.add_resource(GetAllPatients, '/getAllPatients')




        self.api.add_resource(AdminLogin, '/api/login')
        self.api.add_resource(TokenRefresh, '/api/refreshtoken')
        self.api.add_resource(CheckIfTokenExpire, '/api/checkiftokenexpire')

    def run(self):
        self.app.run(self.host, self.port)



