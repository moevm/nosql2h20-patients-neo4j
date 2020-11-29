import React, {Component} from 'react'
import Axios from "axios";
import '../css/PatientResume.css'
import userLogo from '../assets/img/user.png'


const input = {
    padding: "1rem",
}


class PatientResume extends Component {
    constructor() {
        super();
        this.state = {
            passportNumber: "",
            name: "",
            surname: "",
            gender: "Male",
            age: "",
            birthDay: "",
            country: "",
            city: "",        
            diseaseName: "",
            diseaseStart: "",
            diseaseEnd: "",
            invalid: false,
            displayErrors: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
    
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({
                invalid: true,
                displayErrors: true,
            });
            return;
        }

        const data = new FormData(event.target);
        const diseaseData = new FormData();
        const patientData = new FormData();

        let numberInputPatientData = 8;
        let i = 0;
        for (let [name, value] of data) {
            if(i < numberInputPatientData) {
                patientData.append(name, value);
            } else {
                diseaseData.append(name, value);
            }
            i++;
        }
        const namePassport = "passportNumber";
        const passportNumber = data.get(namePassport);
        diseaseData.append("sickPassportNumber", passportNumber);

        this.setState({
            passportNumber: "",
            name: "",
            surname: "",
            gender: "Male",
            age: "",
            birthDay: "",
            country: "",
            city: "",
            diseaseName: "",
            diseaseStart: "",
            diseaseEnd: "",
            invalid: false,
            displayErrors: false,
        });
        
        Axios.post("/postSickPerson", patientData).then(r => {
            console.log(r.data);
        })
        Axios.post("/addDiseaseToPerson", diseaseData);
    }

      render() {
          return (
                <form onSubmit={this.handleSubmit} className={this.state.displayErrors ? 'displayErrors' : ''} noValidate>
                    <div className="w3-row" style={{display: "flex",alignItems: "stretch"}}>
                        <div className="w3-quarter w3-border">
                            <img src={userLogo} alt="User Logo" className="w3-image w3-center" style={input}></img>
                            <div className="w3-container" style={input}>
                                <label htmlFor="passportNumber" className="w3-row">Passport:</label>
                                <input
                                    name="passportNumber"
                                    type="text"
                                    value = {this.state.passportNumber}
                                    onChange={this.handleChange}
                                    className="w3-row"
                                    pattern="\d+" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="w3-threequarter w3-border">
                            <h2 className="w3-center">Information of patient</h2>
                            <div className="w3-container" style={input}>
                                <label htmlFor="name" className="w3-quarter">Name:</label>
                                <input
                                    name="name"
                                    type="text"
                                    value = {this.state.name}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    required
                                />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="surname" className="w3-quarter">Surname:</label>
                                <input
                                    name="surname"
                                    type="text"
                                    value = {this.state.surname}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    required
                                />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="gender" className="w3-quarter">Gender:</label>
                                <select name="gender"
                                        value={this.state.gender} 
                                        onChange={this.handleChange}
                                        className="w3-half w3-input w3-border w3-round"
                                        required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="age" className="w3-quarter">Age:</label>
                                <input
                                    name="age"
                                    type="text"
                                    value = {this.state.age}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    pattern="[0-9]{1,2}"
                                    required
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="birthDay" className="w3-quarter">Date of birth:</label>
                                <input
                                    name="birthDay"
                                    type="text"
                                    value = {this.state.birthDay}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    placeholder="YYYY-MM-DD"
                                    pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                                    required
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="country" className="w3-quarter">Country:</label>
                                <input
                                    name="country"
                                    type="text"
                                    value = {this.state.country}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    required
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="city" className="w3-quarter">City:</label>
                                <input
                                    name="city"
                                    type="text"
                                    value = {this.state.city}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    required
                            />
                            </div>
                            <h2 className="w3-center">Information of patient's diseases</h2>
                            <div className="w3-container" style={input}>
                                <label htmlFor="diseaseName" className="w3-quarter">Disease:</label>
                                <input
                                    name="diseaseName" 
                                    type="text"
                                    value = {this.state.diseaseName}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    required
                                />
                            </div>
                            <div className="w3-container" style={input}>
                            <label htmlFor="diseaseStart" className="w3-quarter">Date of illness:</label>
                                <input
                                    name="diseaseStart" 
                                    type="text"
                                    value = {this.state.diseaseStart}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    placeholder="YYYY-MM-DD"
                                    pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                                    required
                                />
                            </div>
                            <div className="w3-container" style={input}>
                            <label htmlFor="diseaseEnd" className="w3-quarter">Recovery date:</label>
                                <input
                                    name="diseaseEnd" 
                                    type="text"
                                    value = {this.state.diseaseEnd}
                                    onChange={this.handleChange}
                                    className="w3-half"
                                    placeholder="YYYY-MM-DD"
                                    pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                                    required
                                />
                            </div>
                            <div className="w3-center" style={input}>
                                <button className="w3-button w3-blue w3-round">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w3-container w3-black">
                        <h5>Footer</h5>
                    </div>
              </form>
              
          );
      }
}

export default PatientResume;