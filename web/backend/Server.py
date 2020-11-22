from flask import Flask
from flask_restful import Api
from DataBase.DataBaseAPI import PostContact, PostSickPerson, \
                                 PostContactToPerson, PostDisease, AddDiseaseToPerson, \
                                 GetAllDiseaseForRequiredPerson

class Server:
    host = str
    port = int
    app = Flask(__name__)
    api = Api(app)

    def __init__(self, hostVal, portVal):
        self.host = hostVal
        self.port = portVal
        self.api.add_resource(PostContact, '/postContact')
        self.api.add_resource(PostSickPerson, '/postSickPerson')
        self.api.add_resource(PostDisease, '/postDisease')
        self.api.add_resource(AddDiseaseToPerson, '/addDiseaseToPerson')
        self.api.add_resource(PostContactToPerson, '/addContactToPerson')
        self.api.add_resource(GetAllDiseaseForRequiredPerson, '/getPersonDiseases')

    def run(self):
        self.app.run(self.host, self.port)



