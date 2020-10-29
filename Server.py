from flask import Flask
from flask_restful import Api
from TVMainPageAPI import TVMainPage

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
        self.api.add_resource(TVMainPage, '/')

    def run(self):
        self.app.run(self.host, self.port)



