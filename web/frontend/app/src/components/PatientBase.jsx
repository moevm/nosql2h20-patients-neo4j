import React, { useMemo, useState, useEffect } from "react";
import Axios from "axios";

import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import "../css/PatientBase.css";


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

    
    let [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            await Axios.get("/getAllPatients").then(res => {
            setData(JSON.parse(res.data));
          })
        })();
      }, []);

    function updateData(newData) {
        console.log("kek")
        setData(newData);
        // Axios.get("/getAllPatients").then(res => {
        //     let jsonData = JSON.parse( res.data )
        //     setData( jsonData );
        // })
    }
    return (
            <div className="w3-row" style={{display: "flex",alignItems: "stretch"}}>
                <div className="w3-quarter w3-border">
                    <PatientForm updateData={updateData}/>
                </div>
                <div className="w3-threequarter w3-border App">
                    <h2 className="w3-center">Statistics of desease</h2>
                    <PatientTable className="w3-center" columns={columns} data={data} style={{padding: "1rem"}}/>
                </div>
            </div>
        )
}

export default PatientBase;
