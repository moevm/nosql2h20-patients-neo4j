import React, { useMemo, useState, useEffect } from "react";
import Axios from "axios";

import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import "../css/PatientBase.css";

let sickPersons = []

const Genres = ({ values }) => {
    return (
      <>
        {values.map((genre, idx) => {
          return (
            <span key={idx} className="badge">
              {genre}
            </span>
          );
        })}
      </>
    );
};

function PatientBase() {
    const columns = useMemo(
        () => [
            {
                Header: "Passport",
                accessor: "patientInfo.passportNumber"
            },
            {
                Header: "Name",
                accessor: "patientInfo.name"
            },
            {
                Header: "Surname",
                accessor: "patientInfo.surname"
            },
            {
                Header: "Age",
                accessor: "patientInfo.age",
            },
            {
                Header: "Gender",
                accessor: "patientInfo.gender",
            },
            {
                Header: "Disease",
                accessor: "patientDiseases",
                Cell: ({ cell: { value } }) => <Genres values={value} />
            },
            {
                Header: "Country",
                accessor: "patientInfo.country"
            },
            {
                Header: "City",
                accessor: "patientInfo.city"
            }
        ],
        []
      );

    updateData({})
    let [data, setData] = useState(sickPersons)

    function updateData(newData) {
        Axios.get("/getAllPatients").then(res => {
            let jsonData = JSON.parse( res.data )
            setData( jsonData );
        })
    }
    return (
            <div className="w3-row" style={{display: "flex",alignItems: "stretch"}}>
                <div className="w3-quarter w3-border">
                    <PatientForm updateData={updateData}/>
                </div>
                <div className="w3-threequarter w3-border">
                    <h2 className="w3-center">Statistics of desease</h2>
                    <PatientTable columns={columns} data={data} />
                </div>
            </div>
        )
}

export default PatientBase;
