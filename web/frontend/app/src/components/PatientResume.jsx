import React, {Component} from 'react'
import Axios from "axios";


const input = {
    padding: "1rem",
}


class PatientResume extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
    
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        console.log(json)
        Axios.post("/postSickPerson", {json})
      }

      render() {
          return (
                <form onSubmit={this.handleSubmit}>
                    <div className="w3-row" style={{display: "flex",alignItems: "stretch"}}>
                        <div className="w3-quarter w3-border">
                            <h1 className="w3-center"> Photo</h1>
                            <div className="w3-container" style={{input}}>
                                <label htmlFor="passportNumber" className="w3-row">Passport:</label>
                                <input
                                    name="passportNumber"
                                    type="text"
                                    data-parse="uppercase"
                                    className="w3-row"
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
                                    data-parse="uppercase"
                                    className="w3-half"
                                />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="surname" className="w3-quarter">Surname:</label>
                                <input
                                    name="surname"
                                    type="text"
                                    data-parse="uppercase"
                                    className="w3-half"
                                />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="age" className="w3-quarter">Age:</label>
                                <input
                                    name="age"
                                    type="text"
                                    data-parse="uppercase"
                                    className="w3-half"
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="birthDay" className="w3-quarter">Date of birth:</label>
                                <input
                                    name="birthDay"
                                    type="text"
                                    data-parse="date"
                                    className="w3-half"
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="country" className="w3-quarter">Country:</label>
                                <input
                                    name="country"
                                    type="text"
                                    data-parse="uppercase"
                                    className="w3-half"
                            />
                            </div>
                            <div className="w3-container" style={input}>
                                <label htmlFor="city" className="w3-quarter">City:</label>
                                <input
                                    name="city"
                                    type="text"
                                    data-parse="uppercase"
                                    className="w3-half"
                            />
                            </div>
                            <div className="w3-center" style={{padding: "1rem"}}>
                                <button className="w3-button w3-blue w3-round">
                                    Save
                                </button>
                            </div>
                            <h2 className="w3-center">Information of patient</h2>
                        </div>
                    </div>
              </form>
          );
      }
}

export default PatientResume;