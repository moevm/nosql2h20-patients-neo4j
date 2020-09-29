from neomodel import StructuredNode, UniqueIdProperty, StringProperty, RelationshipFrom, config

config.DATABASE_URL = 'bolt://neo4j:password@localhost:7687'

class Disease(StructuredNode):
    diseaseName = StringProperty(unique_index=True)

class Patient(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(unique_index=True)
    disease = RelationshipFrom('Disease', 'DISEASE')

disease1 = Disease(title='disease1').save()
disease2 = Disease(title='disease2').save()
disease3 = Disease(title='disease3').save()

bob = Patient(name='Bob').save()
bob.disease.connect(disease1)
bob.disease.connect(disease2)

ken = Patient(name='Ken').save()
ken.disease.connect(disease3)