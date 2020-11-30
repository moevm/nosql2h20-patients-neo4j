import React from 'react';
import Axios from "axios";

const input = {
  padding: ".5rem"
}

const initialFormData = Object.freeze({
  passportNumber: "",
  name: "",
  surname: "",
  from_age: "",
  to_age: "",
  gender: "",
  country: "",
  city: ""
});

function PatientForm({updateData}) {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  function showByPassport(event) {
    event.preventDefault();
    console.log("showByPassport")

    let requestStr = "/getPatientWithPassport"
    requestStr +=  "?passportNumber=" + formData.passportNumber;
    
    Axios.get(requestStr).then(res => {
      console.log(res.data);
      updateData(JSON.parse(res.data))
    })
  }

  function showByNameAndSurname(event) {
    event.preventDefault();
    console.log("showByNameAndSurname")

    let requestStr = "/getPatientWithNameAndSurname";
    requestStr +=  "?name=" + formData.name;
    requestStr +=  "&surname=" + formData.surname;

    Axios.get(requestStr).then(res => {
      console.log(res.data);
      updateData(JSON.parse(res.data))
    })
  }

  function showByAll(event) {
    event.preventDefault();
    console.log("showByAll")
    let requestStr = "/getPatientWithFilter"
    requestStr +=  "?from_age=" + formData.from_age;
    requestStr +=  "&to_age=" + formData.to_age;
    requestStr +=  "&disease=" + formData.disease;
    requestStr +=  "&gender=" + formData.gender;
    requestStr +=  "&country=" + formData.country;
    requestStr +=  "&city=" + formData.city;

    Axios.get(requestStr).then(res => {
      console.log(res.data);
      updateData(JSON.parse(res.data))
    })
  }

  return (
    <>
      <div className="w3-container" style={input}>
        <label htmlFor="passportNumber" className="w3-row">Enter passport</label>
        <input
          name="passportNumber"
          type="text"
          onChange={handleChange}
          className="w3-row"
          pattern="\d+" 
          required
         />
      </div>
      <div className="w3-center" style={input}>
        <button onClick={showByPassport} className="w3-button w3-blue w3-round">
          Show
        </button>
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="name" className="w3-row">Enter name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="surname" className="w3-row">Enter surname</label>
          <input
            name="surname"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-center" style={input}>
        <button onClick={showByNameAndSurname} className="w3-button w3-blue w3-round">
          Show
        </button>
      </div>
      <h5 className="w3-center">Choose age</h5>
      <div className="w3-container" style={input}>
        <label htmlFor="from_age" className="w3-half">from</label>
          <input
            name="from_age"
            type="text"
            onChange={handleChange}
            className="w3-half"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="to_age" className="w3-half">to</label>
          <input
            name="to_age"
            type="text"
            onChange={handleChange}
            className="w3-half"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="gender" className="w3-row">Enter gender:</label>
          <input
            name="gender"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="disease" className="w3-row">Enter disease:</label>
          <input
            name="disease"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="country" className="w3-row">Enter country:</label>
          <input
            name="country"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="city" className="w3-row">Enter city:</label>
          <input
            name="city"
            type="text"
            onChange={handleChange}
            className="w3-row"
            required
          />
      </div>
      <div className="w3-center" style={input}>
        <button onClick={showByAll} className="w3-button w3-blue w3-round">
          Show
        </button>
      </div>
    </>
  )
}

export default PatientForm;