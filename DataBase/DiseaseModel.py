from neomodel import StringProperty, StructuredNode, IntegerProperty,\
                     RelationshipTo, DateProperty

class Contact(StructuredNode):
    passportNumber = IntegerProperty(unique_index=True)
    name = StringProperty()
    surname = StringProperty()
    age = IntegerProperty()
    birthDay = DateProperty()
    country = StringProperty()
    city = StringProperty()

class Desease(StructuredNode):
    name = StringProperty(unique_index=True)
    deseaseStart = DateProperty()
    deseaseEnd = DateProperty()

class HasDesease(StructuredNode):
    deseaseStart = DateProperty()
    deseaseEnd = DateProperty()

class HasContact(StructuredNode):
    someDefaultData = "lalala"

class SickPerson(StructuredNode):
    passportNumber = IntegerProperty(unique_index=True)
    name = StringProperty()
    surname = StringProperty()
    age = IntegerProperty()
    birthDay = DateProperty()
    country = StringProperty()
    city = StringProperty()
    contacts = RelationshipTo( Contact, HasContact )
    deseases = RelationshipTo( Desease, HasDesease )
