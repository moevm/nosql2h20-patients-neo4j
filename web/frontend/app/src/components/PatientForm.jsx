import React from 'react';

const kek = [
  {
      "patientInfo":{
      "passportNumber":"134343",
      "name":"Gleb",
      "surname":"Novikov",
      "gender":"Male",
      "age":"21",
      "birthDay":"1999-03-18",
      "country":"Russia",
      "city":"спб"
      },
      "patientDiseases":[
          "Vetryanka",
          "Speed",
          "Vich"
      ]
  }
]

function PatientForm({updateData}) {

  function submitHandeler(event) {
    event.preventDefault();
    updateData(kek);
  }

  return (
    <form onSubmit={submitHandeler}> 
      <button type="submit">Show</button>
    </form>
  )
}

export default PatientForm;