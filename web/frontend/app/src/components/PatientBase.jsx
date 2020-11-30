import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import "../css/PatientBase.css";

const sickPersons = [
    {
       "patientInfo":{
          "passportNumber":"33333333",
          "name":"Stepa",
          "surname":"Krivoi",
          "gender":"Male",
          "age":"54",
          "birthDay":"1954-04-05",
          "country":"Russia",
          "city":"Spb"
       },
       "patientDiseases":[
          "Covid-19",
          "Rak",
          "Speed"
       ]
    },
    {
       "patientInfo":{
          "passportNumber":"44343443",
          "name":"Lola",
          "surname":"",
          "gender":"Male",
          "age":"14",
          "birthDay":"2006-02-04",
          "country":"Russia",
          "city":"Pskov"
       },
       "patientDiseases":[
          "Speed"
       ]
    },
    {
       "patientInfo":{
          "passportNumber":"54363656",
          "name":"Nika",
          "surname":"Plot",
          "gender":"Female",
          "age":"34",
          "birthDay":"1985-04-12",
          "country":"Finland",
          "city":"New-Yourk"
       },
       "patientDiseases":[
          "Covid-19",
          "Rak"
       ]
    }
 ]


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


    const [data, setData] = useState(sickPersons)

    useEffect(() => {
        (async () => {
          const result = await axios("/getAllPatients");
          console.log(result.data);
          setData(result.data);
        })();
      }, []);


    function updateData(newData) {
        setData(newData);
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
