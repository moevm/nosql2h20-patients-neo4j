from neomodel import StringProperty, StructuredNode, IntegerProperty

class DiseaseModel(StructuredNode):
    name = StringProperty(unique_index=True)
    level = IntegerProperty()