## Реляционная модель данных
### Графическое представление
<img src="https://github.com/moevm/nosql2h20-patients-neo4j/blob/DataModel/DataModel/images/sql.PNG">

### Описание назначений коллекций, типов данных и сущностей
#### 1. Таблица sickPerson

Предназначена для хранения личной информации о заболевшем.
Содержит поля:
* *passportNumber* - уникальный номер паспорта заболевшего. Type: Int. Size: 4 Byte. 
* *name* - имя заболевшего. Type: String. Size: 50 (максимальный размер имени) * 2 Byte.
* *surname* - фамилия заболевшего. Type: String. Size: 50 (максимальный размер фамилия) * 2 Byte.
* *age* - возраст заболевшего. Type: Int. Size: 4 Byte. 
* *DateOfBirth* - дата рождения заболевшего. Type: Date. Size: 8 Byte. 
* *Country* - страна, в которой живет заболевший. Type: String. Size: 50 (максимальный размер названия страны) * 2 Byte.
* *City* - город, в котором живет заболевший. Type: String. Size: 50 (максимальный размер названия города) * 2 Byte.

*Total size:* ***416 Byte***

#### 2. Таблица desease

Предназначена для хранения информации о существующих болезнях.
Содержит поля:
* *deseaseID* - уникальный болезни. Type: Int. Size: 4 Byte. 
* *deseaseName* - название болезни. Type: String. Size: 50 (максимальный размер для названия болезни) * 2 Byte.

*Total size:* ***104 Byte***

#### 3. Таблица contacts

Предназначена для хранения личной информации о человеке, который контактировал с заболевшим.
Содержит поля:
* *passportNumber* - уникальный номер паспорта контактирующего. Type: Int. Size: 4 Byte. 
* *name* - имя контактирующего. Type: String. Size: 50 (максимальный размер имени) * 2 Byte.
* *surname* - фамилия контактирующего. Type: String. Size: 50 (максимальный размер фамилия) * 2 Byte.
* *age* - возраст контактирующего. Type: Int. Size: 4 Byte. 
* *DateOfBirth* - дата рождения контактирующего. Type: Date. Size: 8 Byte. 
* *Country* - страна, в которой живет контактирующий. Type: String. Size: 50 (максимальный размер названия страны) * 2 Byte.
* *City* - город, в котором живет контактирующий. Type: String. Size: 50 (максимальный размер названия города) * 2 Byte.

*Total size:* ***416 Byte***

#### 4. Таблица sickPersonContacts

Предназначена для хранения информации о том, с кем контактировал каждый заболевший.
Содержит поля:
* *sickPassportNumber* - номер паспорта заболевшего. Type: Int. Size: 4 Byte. 
* *contactPassportNumber* - номер паспорта контактирующего. Type: Int. Size: 4 Byte. 

*Total size:* ***8 Byte***

#### 5. Таблица personDesease

Предназначена для хранения информации о болезнях заболевшего.
Содержит поля:
* *sickPassportNumber* - номер паспорта заболевшего. Type: Int. Size: 4 Byte. 
* *deseaseID* - идентификатор болезни. Type: Int. Size: 4 Byte. 
* *deseaseStart* - дата начала болезни. Type: Date. Size: 8 Byte. 
* *deseaseEnd* - дата конца болезни. Type: Date. Size: 8 Byte. 

*Total size:* ***24 Byte***
