import React, {useState} from 'react';
import Axios from "axios";

import '../css/PatientResume.css';

const input = {
  padding: ".5rem",
}

const initialFormData = Object.freeze({
  passportNumber: "",
  name: "",
  surname: "",
  disease: "",
  from_age: "0",
  to_age: "100",
  gender: "All",
  country: "World",
  city: ""
});

function PatientForm({updateData}) {
  const [formData, updateFormData] = useState(initialFormData);
  const [displayErrors, setDisplayErrors] = useState(false);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  function isValidForm(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      setDisplayErrors(true);
      console.log("form is empty")
      return false;
    }
    return true;
  }

  function getReq(requestStr) {
    Axios.get(requestStr).then(res => {
      console.log(res.data);
      updateData(JSON.parse(res.data))
    })
  }

  function showByPassport(event) {
    if(!isValidForm(event)) {
      return;
    }
    console.log("showByPassport")

    let requestStr = "/getPatientWithPassport"
    requestStr +=  "?passportNumber=" + formData.passportNumber;

    getReq(requestStr);
  }



  function showByNameAndSurname(event) {
    if(!isValidForm(event)) {
      return;
    }
    console.log("showByNameAndSurname")

    let requestStr = "/getPatientWithNameAndSurname";
    requestStr +=  "?name=" + formData.name;
    requestStr +=  "&surname=" + formData.surname;

    getReq(requestStr);    
  }

  function showByAll(event) {
    if(!isValidForm(event)) {
      return;
    }
    console.log("showByAll")

    let requestStr = "/getPatientWithFilter"
    requestStr +=  "?from_age=" + formData.from_age;
    requestStr +=  "&to_age=" + formData.to_age;
    requestStr +=  "&disease=" + formData.disease;
    requestStr +=  "&gender=" + formData.gender;
    requestStr +=  "&country=" + formData.country;
    requestStr +=  "&city=" + formData.city;

    getReq(requestStr);   
  }

  return (
    <>
      <form onSubmit={showByPassport} noValidate>
        <div className="w3-container" style={input}>
          <label htmlFor="passportNumber" className="w3-row">Enter passport</label>
          <input
            name="passportNumber"
            type="text"
            onChange={handleChange}
            className="w3-row"
            pattern="\d+" 
            required
            style={input}
          />
        </div>
        <div className="w3-center" style={input}>
          <button className="w3-button w3-blue w3-round">
              Show
          </button>
        </div>
      </form>
      <form onSubmit={showByNameAndSurname} noValidate>
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
          <button className="w3-button w3-blue w3-round">
            Show
          </button>
        </div>
      </form>
      <form onSubmit={showByAll} noValidate>
        <h5 className="w3-center">Choose age</h5>
        <div className="w3-container" style={input}>
          <label htmlFor="from_age" className="w3-half">from</label>
            <input
              name="from_age"
              value = {formData.from_age}
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
              value = {formData.to_age}
              type="text"
              onChange={handleChange}
              className="w3-half"
              required
            />
        </div>
        <div className="w3-container" style={input}>
          <label htmlFor="gender" className="w3-row">Enter gender</label>
            <input
              name="gender"
              value = {formData.gender}
              type="text"
              onChange={handleChange}
              className="w3-row"
              required
            />
        </div>
        <div className="w3-container" style={input}>
          <label htmlFor="disease" className="w3-row">Enter disease</label>
            <input
              name="disease"
              value = {formData.disease}
              type="text"
              onChange={handleChange}
              className="w3-row"
              required
            />
        </div>
        <div className="w3-container" style={input}>
          <label htmlFor="country" className="w3-row">Enter country</label>
            <input
              name="country"
              value = {formData.country}
              type="text"
              onChange={handleChange}
              className="w3-row"
              required
            />
        </div>
        <div className="w3-container" style={input}>
          <label htmlFor="city" className="w3-row">Enter city</label>
            <input
              name="city"
              value = {formData.city}
              type="text"
              onChange={handleChange}
              className="w3-row"
              // required
            />
        </div>
        <div className="w3-center" style={input}>
          <button className="w3-button w3-blue w3-round">
            Show
          </button>
        </div>
      </form>
    </>
  )
}

export default PatientForm;