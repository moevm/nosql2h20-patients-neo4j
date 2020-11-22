from neomodel import StringProperty, StructuredNode, IntegerProperty,\
                     RelationshipTo, DateProperty, StructuredRel

class HasDisease(StructuredRel):
    diseaseStart = DateProperty()
    diseaseEnd = DateProperty()

class HasContact(StructuredRel):
    someDefaultData = "lalala"

class Contact(StructuredNode):
    passportNumber = IntegerProperty(unique_index=True)
    name = StringProperty()
    surname = StringProperty()
    age = IntegerProperty()
    birthDay = DateProperty()
    country = StringProperty()
    city = StringProperty()

class Disease(StructuredNode):
    name = StringProperty(unique_index=True)

class SickPerson(StructuredNode):
    passportNumber = IntegerProperty(unique_index=True)
    name = StringProperty()
    surname = StringProperty()
    age = IntegerProperty()
    birthDay = DateProperty()
    country = StringProperty()
    city = StringProperty()
    contacts = RelationshipTo( Contact, HasContact, model=HasContact )
    diseases = RelationshipTo(Disease, HasDisease, model=HasDisease)
