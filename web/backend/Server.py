from flask import Flask
from flask_restful import Api
from DataBase.DataBaseAPI import DataBaseAPI_contact, DataBaseAPI_sickPerson, \
                                 DataBaseAPI_addContact, DataBaseAPI_desease, DataBaseAPI_addDesease, \
                                 DataBaseAPI_getAllDeseaseForRequiredPerson

class Server:
    host = str
    port = int
    app = Flask(__name__)
    api = Api(app)

    def __init__(self, hostVal, portVal):
        self.host = hostVal
        self.port = portVal
        self.initRoutes()

    def initRoutes(self):
        self.api.add_resource(DataBaseAPI_contact, '/contact')
        self.api.add_resource(DataBaseAPI_sickPerson, '/sickPerson')
        self.api.add_resource(DataBaseAPI_desease, '/desease')
        self.api.add_resource(DataBaseAPI_addDesease, '/addDesease')
        self.api.add_resource(DataBaseAPI_addContact, '/addContact')
        self.api.add_resource(DataBaseAPI_getAllDeseaseForRequiredPerson, '/getPersonDeseases')

    def run(self):
        self.app.run(self.host, self.port)



