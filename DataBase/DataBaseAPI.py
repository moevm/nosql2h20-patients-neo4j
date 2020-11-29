from flask_restful import Resource, reqparse
from DataBase.DiseaseModel import Contact, SickPerson, Disease
import datetime, json


# POST request
class PostContact(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('gender', type=str)
        parser.add_argument('age', type=int)
        parser.add_argument('birthDay', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        args = parser.parse_args()
        Contact(name=args['name'], surname=args['surname'], age=args['age'],
                birthDay=datetime.datetime.strptime(args['birthDay'],'%Y-%m-%d').date(),
                country=args['country'], city=args['city'], gender=args['gender'],
                passportNumber=args['passportNumber']).save()
        return "New contact is added"


class PostSickPerson(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('gender', type=str)
        parser.add_argument('age', type=int)
        parser.add_argument('birthDay', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        args = parser.parse_args()
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['passportNumber']:
                return "Passport number used"
        SickPerson( name=args['name'], surname=args['surname'], age=args['age'],
                    birthDay=datetime.datetime.strptime(args['birthDay'],'%Y-%m-%d').date(),
                    country=args['country'], city=args['city'], gender=args['gender'],
                    passportNumber=args['passportNumber']).save()
        return "New sickPerson is added"


class PostDisease(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        args = parser.parse_args()
        Disease(name=args['name']).save()
        return "New disease is added"


class PostContactToPerson(Resource):
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
        return "sickPerson was taken new contact"


class AddDiseaseToPerson(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('sickPassportNumber', type=int)
        parser.add_argument('diseaseName', type=str)
        parser.add_argument('diseaseStart', type=str)
        parser.add_argument('diseaseEnd', type=str)
        args = parser.parse_args()
        _sickPerson = {}
        _disease = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['sickPassportNumber']:
                _sickPerson = sickPerson

        for disease in Disease.nodes:
            if disease.name == args['diseaseName']:
                _disease = disease
        _sickPerson.diseases.connect(
                _disease,
                { 'diseaseStart' : datetime.datetime.strptime(args['diseaseStart'],'%Y-%m-%d').date(),
                  'diseaseEnd' : datetime.datetime.strptime(args['diseaseEnd'],'%Y-%m-%d').date() } )
        return "sickPerson was taken new disease"


# GET request
class GetAllDisease(Resource):
    def get(self):
        diseases = ""
        for disease in Disease.nodes:
            diseases += " {"
            diseases += '"name" : "' + str(disease.name) + '",'
            diseases += "} , "
        return "[ " + diseases + " ]"


class GetAllCountries(Resource):
    def get(self):
        countries = ""
        c = []
        c_new = []
        for sickPerson in SickPerson.nodes:
            c.append(sickPerson.country)
        for item in c:
            if item not in c_new:
                c_new.append(item)
                countries += " {"
                countries += '"name" : "' + str(item) + '"'
                countries += "} , "
        return "[ " + countries + " ]"


class GetAllCities(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('country', type=str)
        args = parser.parse_args()

        cities = ""
        c = []
        c_new = []
        for sickPerson in SickPerson.nodes:
            if sickPerson.country == args['country']:
                c.append(sickPerson.city)
        for item in c:
            if item not in c_new:
                c_new.append(item)
                cities += " {"
                cities += '"name" : "' + str(item) + '"'
                cities += "} , "
        return "[ " + cities + " ]"


class GetAllDiseaseForRequiredPerson(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('sickPassportNumber', type=int)
        args = parser.parse_args()

        _sickPerson = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['sickPassportNumber']:
                _sickPerson = sickPerson

        return  [ [ { "name" : Disease.name } ] for Disease in _sickPerson.diseases ]


class GetPatientNSbyPassport(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        args = parser.parse_args()

        _sickPerson = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['passportNumber']:
                _sickPerson = sickPerson

        return [{"name": _sickPerson.name},
                {"surname": _sickPerson.surname}]


class GetAllPatients(Resource):
    def get(self):
        responce = ""
        for _sickPerson in SickPerson.nodes:
            responce += ', { "patientInfo" : { '
            responce += '"passportNumber" : "' + str(_sickPerson.passportNumber) + '", '
            responce += '"name" : "' + str(_sickPerson.name) + '", '
            responce += '"surname" : "' + str(_sickPerson.surname) + '", '
            responce += '"gender" : "' + str(_sickPerson.gender) + '", '
            responce += '"age" : "' + str(_sickPerson.age) + '", '
            responce += '"birthDay" : "' + str(_sickPerson.birthDay) + '", '
            responce += '"country" : "' + str(_sickPerson.country) + '", '
            responce += '"city" : "' + str(_sickPerson.city)
            responce += '" }, "patientDiseases" : ['
            responceSave = responce
            for _disease in _sickPerson.diseases:
                responce += " {"
                responce += '"name" : "' + _disease.name + '", '
                responce += '"diseaseStart" : "' + str(_sickPerson.diseases.relationship(_disease).diseaseStart) + '", '
                responce += '"diseaseEnd" : "' + str(_sickPerson.diseases.relationship(_disease).diseaseEnd) + '" '
                responce += "} , "

            if responce != responceSave:
                responce = responce[0:len(responce)-2]
            responce += "] }"
        return "[ " + responce[2:] + " ]"


class GetPatientWithPassport(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('passportNumber', type=int)
        args = parser.parse_args()

        _sickPerson = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.passportNumber == args['passportNumber']:
                _sickPerson = sickPerson

        return [{"passportNumber": _sickPerson.passportNumber},
                {"name": _sickPerson.name},
                {"surname": _sickPerson.surname},
                {"age": _sickPerson.age},
                [[{"diseases": Disease.name}] for Disease in _sickPerson.diseases],
                {"gender": _sickPerson.gender},
                {"country": _sickPerson.country},
                {"city": _sickPerson.city}
               ]


class GetPatientWithNameAndSurname(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        args = parser.parse_args()

        _sickPerson = {}
        for sickPerson in SickPerson.nodes:
            if sickPerson.name == args['name'] and sickPerson.surname == args['surname']:
                _sickPerson = sickPerson

        return [{"passportNumber": _sickPerson.passportNumber},
                {"name": _sickPerson.name},
                {"surname": _sickPerson.surname},
                {"age": _sickPerson.age},
                [[{"diseases": Disease.name}] for Disease in _sickPerson.diseases],
                {"gender": _sickPerson.gender},
                {"country": _sickPerson.country},
                {"city": _sickPerson.city}
               ]


class GetPatientWithDisease(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('disease', type=str)
        args = parser.parse_args()

        _sickPerson = {}
        for sickPerson in SickPerson.nodes:
            for Disease in sickPerson.diseases:
                if Disease.name == args['disease']:
                    _sickPerson = sickPerson

        return [{"passportNumber": _sickPerson.passportNumber},
                {"name": _sickPerson.name},
                {"surname": _sickPerson.surname},
                {"age": _sickPerson.age},
                [[{"diseases": Disease.name}] for Disease in _sickPerson.diseases],
                {"gender": _sickPerson.gender},
                {"country": _sickPerson.country},
                {"city": _sickPerson.city}
                ]


class GetPatientWithFilter(Resource):
    def get(self):
        def printOut(responce, _sickPerson):
            responce += '{"passportNumber" : "' + str(_sickPerson.passportNumber) + '", '
            responce += '"name" : "' + str(_sickPerson.name) + '", '
            responce += '"surname" : "' + str(_sickPerson.surname) + '", '
            responce += '"gender" : "' + str(_sickPerson.gender) + '", '
            responce += '"age" : "' + str(_sickPerson.age) + '", '
            responce += '"country" : "' + str(_sickPerson.country) + '", '
            responce += '"city" : "' + str(_sickPerson.city)
            for Disease in _sickPerson.diseases:
                responce += '" }, "patientDiseases" : [ ' + Disease.name + ','
            responce += '] }"'
            return responce

        parser = reqparse.RequestParser()
        parser.add_argument('from_age', type=int)
        parser.add_argument('to_age', type=int)
        parser.add_argument('disease', type=str)
        parser.add_argument('gender', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        args = parser.parse_args()

        _sickPerson = {}
        responce = ""
        nullResponce = ""
        for sickPerson in SickPerson.nodes:
            # DISEASE
            for Disease in sickPerson.diseases:
                if Disease.name == args['disease']:
                    # AGE
                    if sickPerson.age >= args['from_age'] and sickPerson.age <= args['to_age']:
                        # M/F
                        if sickPerson.gender == args['gender']:
                            # COUNTRY -> CITY
                            if sickPerson.country == args['country'] and sickPerson.city == args['city']:
                                _sickPerson = sickPerson
                                responce = printOut(responce, _sickPerson)
                            # COUNTRY
                            else:
                                if sickPerson.country == args['country']:
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                            # WORLD
                                if args['country'] == 'World':
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                        # ALL
                        else:
                            if args['gender'] == 'All':
                                # COUNTRY -> CITY
                                if sickPerson.country == args['country'] and sickPerson.city == args['city']:
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                                # COUNTRY
                                else:
                                    if sickPerson.country == args['country']:
                                        _sickPerson = sickPerson
                                        responce = printOut(responce, _sickPerson)
                                # WORLD
                                if args['country'] == 'World':
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
        if responce == nullResponce:
            return "Patients not found"
        return "[ " + responce + " ]"


class ExportBase(Resource):
    def get(self):
        responce = ""
        for _sickPerson in SickPerson.nodes:
            responce += ', { "patientInfo" : { '
            responce += '"passportNumber" : "' + str(_sickPerson.passportNumber) + '", '
            responce += '"name" : "' + str(_sickPerson.name) + '", '
            responce += '"surname" : "' + str(_sickPerson.surname) + '", '
            responce += '"gender" : "' + str(_sickPerson.gender) + '", '
            responce += '"age" : "' + str(_sickPerson.age) + '", '
            responce += '"birthDay" : "' + str(_sickPerson.birthDay) + '", '
            responce += '"country" : "' + str(_sickPerson.country) + '", '
            responce += '"city" : "' + str(_sickPerson.city)

            responce += '" }, "patientDiseases" : ['
            responceSave = responce
            for _disease in _sickPerson.diseases:
                responce += " {"
                responce += '"name" : "' + _disease.name + '", '
                responce += '"diseaseStart" : "' + str(_sickPerson.diseases.relationship(_disease).diseaseStart) + '", '
                responce += '"diseaseEnd" : "' + str(_sickPerson.diseases.relationship(_disease).diseaseEnd) + '" '
                responce += "} , "
            if responce != responceSave:
                responce = responce[0:len(responce)-2]
            responce += "]"

            responce += '", "patientsContacts" : ['
            responceSave1 = responce
            for contact in _sickPerson.contacts:
                responce += " {"
                responce += '"passportNumber" : "' + str(contact.passportNumber) + '", '
                responce += '"name" : "' + str(contact.name) + '", '
                responce += '"surname" : "' + str(contact.surname) + '", '
                responce += '"gender" : "' + str(contact.gender) + '", '
                responce += '"age" : "' + str(contact.age) + '", '
                responce += '"birthDay" : "' + str(contact.birthDay) + '", '
                responce += '"country" : "' + str(contact.country) + '", '
                responce += '"city" : "' + str(contact.city)
                responce += "} , "
            if responce != responceSave1:
                responce = responce[0:len(responce) - 2]
            responce += "] }"

        responce = "[ " + responce[2:] + " ]"

        jsonData = json.dumps(responce)
        with open("data.json", "w") as file:
            file.write(jsonData)
        return "Database export was a success"


'''
# Запрос для фильтра Patient base
class GetPatientWithFilter(Resource):
    def get(self):
        def printOut(responce, _sickPerson):
            responce += '{"passportNumber" : "' + str(_sickPerson.passportNumber) + '", '
            responce += '"name" : "' + str(_sickPerson.name) + '", '
            responce += '"surname" : "' + str(_sickPerson.surname) + '", '
            responce += '"gender" : "' + str(_sickPerson.gender) + '", '
            responce += '"age" : "' + str(_sickPerson.age) + '", '
            responce += '"country" : "' + str(_sickPerson.country) + '", '
            responce += '"city" : "' + str(_sickPerson.city)
            for Disease in _sickPerson.diseases:
                responce += '" }, "patientDiseases" : [ ' + Disease.name + ','
            responce += '] }"'
            return responce

        parser = reqparse.RequestParser()
        parser.add_argument('disease', type=str)
        parser.add_argument('country', type=str)
        parser.add_argument('city', type=str)
        parser.add_argument('gender', type=str)
        parser.add_argument('from_age', type=int)
        parser.add_argument('to_age', type=int)
        parser.add_argument('time', type=int)
        parser.add_argument('scale', type=int)
        args = parser.parse_args()

        _sickPerson = {}
        responce = ""
        nullResponce = ""
        for sickPerson in SickPerson.nodes:
            # DISEASE
            for Disease in sickPerson.diseases:
                if Disease.name == args['disease']:
                    # AGE
                    if sickPerson.age >= args['from_age'] and sickPerson.age <= args['to_age']:
                        # M/F
                        if sickPerson.gender == args['gender']:
                            # COUNTRY -> CITY
                            if sickPerson.country == args['country'] and sickPerson.city == args['city']:
                                _sickPerson = sickPerson
                                responce = printOut(responce, _sickPerson)
                            # COUNTRY
                            else:
                                if sickPerson.country == args['country']:
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                            # WORLD
                                if args['country'] == 'World':
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                        # ALL
                        else:
                            if args['gender'] == 'All':
                                # COUNTRY -> CITY
                                if sickPerson.country == args['country'] and sickPerson.city == args['city']:
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
                                # COUNTRY
                                else:
                                    if sickPerson.country == args['country']:
                                        _sickPerson = sickPerson
                                        responce = printOut(responce, _sickPerson)
                                # WORLD
                                if args['country'] == 'World':
                                    _sickPerson = sickPerson
                                    responce = printOut(responce, _sickPerson)
        if responce == nullResponce:
            return "Patients not found"       
        '''