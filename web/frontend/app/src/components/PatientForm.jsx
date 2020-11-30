import React from 'react';

const input = {
  padding: "20px"
}

function PatientForm({updateData}) {

  function submitHandeler(event) {
    event.preventDefault();
    console.log(event)
    
    // updateData([]);
  }

  return (
    <form onSubmit={submitHandeler}>
      <div className="w3-container" style={input}>
        <label htmlFor="passportNumber" className="w3-row w3-center">Enter passport</label>
          <input
            name="passportNumber"
            type="text"
                                  // value = {this.state.passportNumber}
                                    // onChange={this.handleChange}
            className="w3-row"
          />
      </div>
      <div className="w3-center" style={input}>
        <button name="passport" type="submit" className="w3-button w3-blue w3-round">Show</button>
      </div> 
      <div className="w3-container" style={input}>
        <label htmlFor="name" className="w3-quarter">Name:</label>
         <input
            name="name"
            type="text"
                                    // value = {this.state.name}
                                    // onChange={this.handleChange}
                                    // className="w3-half"
                                    
            />
      </div>
      <div className="w3-container" style={input}>
        <label htmlFor="surname" className="w3-quarter">Surname:</label>
          <input
              name="surname"
              type="text"
                                    // value = {this.state.surname}
                                    // onChange={this.handleChange}
                                    // className="w3-half"
                                    
          />
      </div>
      <div className="w3-center" style={input}>
        <button type="submit" className="w3-button w3-blue w3-round">Show</button>
      </div> 
    </form>
  )
}

export default PatientForm;