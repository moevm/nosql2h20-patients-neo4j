from flask_restful import Resource, reqparse
from DataBase.DiseaseModel import Contact, SickPerson, Desease
import datetime

class DataBaseAPI_contact( Resource ):
    def get(self):
        return  [ [ { "name" : Contact.name } ] for Contact in Contact.nodes ]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('age', type=int)
        parser.add_argument('birthDay', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        args = parser.parse_args()
        Contact(name=args['name'], surname=args['surname'], age=args['age'],
                birthDay=datetime.datetime.strptime(args['birthDay'],'%Y-%m-%d').date(),
                country=args['country'], city=args['city'],
                passportNumber=args['passportNumber']).save()
        return self.get()

class DataBaseAPI_sickPerson( Resource ):
    def get(self):
        return  [ [ { "name" : SickPerson.name } ] for SickPerson in SickPerson.nodes ]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('age', type=int)
        parser.add_argument('birthDay', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        args = parser.parse_args()

        SickPerson(
                name=args['name'], surname=args['surname'], age=args['age'],
                birthDay=datetime.datetime.strptime(args['birthDay'],'%Y-%m-%d').date(),
                country=args['country'], city=args['city'],
                passportNumber=args['passportNumber']).save()
        return self.get()

class DataBaseAPI_desease( Resource ):
    def get(self):
        return  [ [ { "name" : Desease.name } ] for Desease in Desease.nodes ]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('deseaseStart', type=str)
        parser.add_argument('deseaseEnd', type=str)
        args = parser.parse_args()
        Desease(name=args['name'],
                deseaseStart=datetime.datetime.strptime(args['deseaseStart'],'%Y-%m-%d').date(),
                deseaseEnd=datetime.datetime.strptime(args['deseaseEnd'],'%Y-%m-%d').date()).save()
        return self.get()

class DataBaseAPI_addContact( Resource ):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('sickPassportNumber', type=int)
        parser.add_argument('contactPassportNumber', type=int)
        args = parser.parse_args()
        _sickPerson = {}
        _contact = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['sickPassportNumber']:
                _sickPerson = sickPerson

        for contact in Contact.nodes:
            if contact.passportNumber == args['contactPassportNumber']:
                _contact = contact

        _sickPerson.contacts.connect( _contact )

class DataBaseAPI_addDesease( Resource ):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('sickPassportNumber', type=int)
        parser.add_argument('name', type=str)
        args = parser.parse_args()
        _sickPerson = {}
        _desease = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['sickPassportNumber']:
                _sickPerson = sickPerson

        for desease in Desease.nodes:
            if desease.name == args['name']:
                _desease = desease

        _sickPerson.deseases.connect( _desease )

class DataBaseAPI_getAllDeseaseForRequiredPerson( Resource ):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('sickPassportNumber', type=int)
        args = parser.parse_args()
        _sickPerson = {}

        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['sickPassportNumber']:
                _sickPerson = sickPerson

        return  [ [ { "name" : Desease.name } ] for Desease in _sickPerson.deseases ]

