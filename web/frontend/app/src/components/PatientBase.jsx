import React, { Component } from "react";


class PatientBase extends Component {

    

    componentDidMount() {

    }

    render() {
        return (
            <div className="w3-row">
                <div className="w3-container w3-quarter w3-border" >
                    <form action="">
                        <h2 className="w3-center">Filters</h2>
                        <div>
                            <label htmlFor="passport">Enter Passport</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="passport"
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Enter Name</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="surname">Enter Surname</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="surname"
                            />
                        </div>
                        <div>
                            <label htmlFor="age">Choose age</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="age"
                            />
                        </div>
                        <div>
                            <label htmlFor="">Choose disease</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="disease"
                            />
                        </div>
                        <div>
                            <label htmlFor="Choose gender">Choose gender</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="gender"
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Choose country</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="country"
                            />
                        </div>
                        <div>
                            <label htmlFor="city">Choose city</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="city"
                            />
                        </div>
                        <div>
                            <button type="submit" className="w3-button w3-blue">
                                Show
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w3-green w3-container w3-threequarter">
                    <h2>Statistics of desease</h2>
                </div>
            </div>

        )
    }
}

export default PatientBase;