from flask_restful import Resource, reqparse
from DiseaseModel import DiseaseModel

class TVMainPage(Resource):
    def get(self):
        return  [ [ { "name" : DiseaseModel.name }, { "Level" : DiseaseModel.level } ]
                    for DiseaseModel in DiseaseModel.nodes ]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('level', type=int)
        args = parser.parse_args()
        DiseaseModel(name=args['name'], level=args['level']).save()
        return self.get()
