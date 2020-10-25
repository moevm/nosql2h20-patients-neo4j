## Реляционная модель данных
### Графическое представление
<img src="https://github.com/moevm/nosql2h20-patients-neo4j/blob/DataModel/DataModel/images/sql.PNG">

### Описание назначений коллекций, типов данных и сущностей
#### 1. Таблица sickPerson

Предназначена для хранения личной информации о заболевшем.
Содержит поля:
* passportNumber - уникальный номер паспорта заболевшего. Type: Int. Size: 4 Byte. 
* name - имя заболевшего. Type: String. Size: 50 (максимальный размер имени) * 2 Byte.
* surname - фамилия заболевшего. Type: String. Size: 50 (максимальный размер фамилия) * 2 Byte.
* age - возраст заболевшего. Type: Int. Size: 4 Byte. 
* DateOfBirth - дата рождения заболевшего. Type: Date. Size: 8 Byte. 
* Country - страна, в которой живет заболевший. Type: String. Size: 50 (максимальный размер названия страны) * 2 Byte.
* City - город, в котором живет заболевший. Type: String. Size: 50 (максимальный размер названия города) * 2 Byte.

*Total size:* ***416 Byte***
