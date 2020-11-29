import React, { Component, useState} from "react";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";



function PatientBase() {
    const [dataForm, setDataForm] = useState([])

    function updateData() {
        
    }
    return (
            <div className="w3-row" style={{display: "flex",alignItems: "stretch"}}>
                <div className="w3-quarter w3-border">
                    <PatientForm updateData={updateData}/>
                </div>
                <div className="w3-threequarter w3-border">
                    <h2>Statistics of desease</h2>
                    {/* <PatientTable dataForm={dataForm}/> */}
                </div>
            </div>
        )
}

export default PatientBase;
