import DataBase.DataBaseSettings
from DataBase.DiseaseModel import Contact, SickPerson, Disease
from datetime import date
from random import randint
import random

for patient in SickPerson.nodes:
    patient.delete()

for contact in Contact.nodes:
    contact.delete()

for disease in Disease.nodes:
    disease.delete()

NUMBER_OF_PATIENTS = 1000
NUMBER_OF_CONTACTS = NUMBER_OF_PATIENTS * 2
Names = ["Oliver", "Jack", "Harry", "Jacob", "Charlie", "Thomas", "George", "Oscar ", "James", "William",
         "Amelia", "Olivia", "Isla", "Emily", "Poppy", "Ava", "Isabella", "Jessica", "Lily", "Sophie"]
Surnames = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Roberts",
            "Li", "Lam", "Martin", "Gelbero", "Roy", "Tremblay", "Lee", "Gagnon", "Wilson"]
Countries = ["Russia", "Antarctica", "China", "United States", " Brazil", "Australia", "India", "Argentina"]
Cites = ["Moscow", "Novosibirsk", "Yekaterinburg", "Kazan", "Chelyabinsk", "Samara", "Omsk", "Ufa", "Perm", "Volgograd"]
Genders = ["Male", "Female"]
DiseaseList = ["Cancer", "COVID19", "Celiac Disease", "Heart Disease", "Liver Disease", "Autoimmune Diseases"]


def checkGender(nameNumber):
    if nameNumber < (len(Names) - 1) / 2:
        return "Male"
    return "Female"


for currentContactPN in range(0, NUMBER_OF_CONTACTS):
    generatedContactAge = randint(10, 99)
    generatedContactNameNumber = randint(0, len(Names) - 1)
    Contact(
        name=Names[generatedContactNameNumber],
        surname=Surnames[randint(0, len(Surnames) - 1)],
        age=generatedContactAge,
        birthDay=date(date.today().year - generatedContactAge, randint(1, 12), randint(1, 28)),
        country=Countries[randint(0, len(Countries) - 1)],
        city=Cites[randint(0, len(Cites) - 1)],
        gender=checkGender(generatedContactNameNumber),
        passportNumber=currentContactPN
    ).save()

for disease in DiseaseList:
    Disease(name=disease).save()

for currentPatientPN in range(0, NUMBER_OF_PATIENTS):
    generatedPatientAge = randint(10, 99)
    generatedPatientNameNumber = randint(0, len(Names) - 1)
    currentPatient = SickPerson(
        name=Names[generatedPatientNameNumber],
        surname=Surnames[randint(0, len(Surnames) - 1)],
        age=generatedPatientAge,
        birthDay=date(date.today().year - generatedPatientAge, randint(1, 12), randint(1, 28)),
        country=Countries[randint(0, len(Countries) - 1)],
        city=Cites[randint(0, len(Cites) - 1)],
        gender=checkGender(generatedPatientNameNumber),
        passportNumber=currentPatientPN
    ).save()

    contactGeneratedNum = random.sample(range(0, NUMBER_OF_CONTACTS), randint(1, 10))
    for contactNum in contactGeneratedNum:
        currentPatient.contacts.connect(Contact.nodes[contactNum])

for patient in SickPerson.nodes:
    today = date.today()
    DiseaseListCopy = DiseaseList.copy()
    for i in range(1, randint(2, 4)):
        diseaseStart = date(today.year - randint(1, 4), ((today.month + randint(1, 12)) % 11 + 1),
                            ((today.day + randint(1, 12)) % 27 + 1))
        if bool(random.choice([True, True, True, False])):
            diseaseEnd = date(diseaseStart.year + randint(1, 4), ((diseaseStart.month + randint(1, 12)) % 11 + 1),
                              ((diseaseStart.day + randint(1, 28)) % 27 + 1))
        else:
            diseaseEnd = None

        diseaseName = DiseaseListCopy[randint(0, len(DiseaseListCopy) - 1)]
        DiseaseListCopy.remove(diseaseName)

        _disease = {}
        for disease in Disease.nodes:
            if disease.name == diseaseName:
                _disease = disease
        patient.diseases.connect(_disease,
                                 {'diseaseStart': diseaseStart,
                                  'diseaseEnd': diseaseEnd})
