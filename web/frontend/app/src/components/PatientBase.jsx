import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import "../css/PatientBase.css";


const sickPersons = [
    {
        "patientInfo":{
        "passportNumber":"101032",
        "name":"Egor Gabov",
        "surname":"Gabov",
        "gender":"None",
        "age":"20",
        "birthDay":"2000-10-10",
        "country":"Russia",
        "city":"спб"
        },
        "patientDiseases":[
            "COVID",
            "COVID-20"
            // {
            //     "name":"COVID",
            //     "diseaseStart":"2020-10-10",
            //     "diseaseEnd":"2020-10-10"
            //  }
        ]
    }
]
/*
const sickPersons = [
    {
       "patientInfo":{
          "passportNumber":"101032",
          "name":"Egor Gabov",
          "surname":"Gabov",
          "gender":"None",
          "age":"20",
          "birthDay":"2000-10-10",
          "country":"Russia",
          "city":"спб"
       },
       "patientDiseases":[
          {
             "name":"COVID",
             "diseaseStart":"2020-10-10",
             "diseaseEnd":"2020-10-10"
          }
       ]
    },
    {
       "patientInfo":{
          "passportNumber":"101032",
          "name":"Egor Gabov",
          "surname":"Gabov",
          "gender":"None",
          "age":"25",
          "birthDay":"2000-10-10",
          "country":"Russia",
          "city":"спб"
       },
       "patientDiseases":[
          
       ]
    },
    {
       "patientInfo":{
          "passportNumber":"101032",
          "name":"Egor Gabov",
          "surname":"Gabov",
          "gender":"None",
          "age":"9",
          "birthDay":"2000-10-10",
          "country":"Russia",
          "city":"спб"
       },
       "patientDiseases":[
          
       ]
    },
    {
       "patientInfo":{
          "passportNumber":"101032",
          "name":"Egor Gabov",
          "surname":"Gabov",
          "gender":"None",
          "age":"39",
          "birthDay":"2000-10-10",
          "country":"Russia",
          "city":"спб"
       },
       "patientDiseases":[
          {
             "name":"COVID-19",
             "diseaseStart":"2020-10-10",
             "diseaseEnd":"2020-10-10"
          }
       ]
    }
 ]*/

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
          const result = await axios("/getAllDisease");
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
