import React, { Component } from "react";

class Menu extends Component {


    render() {
        return (
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <a className="w3-button w3-round"  href="/statistic"
                    style={{ padding: "2rem", marginTop: "1rem" }}>
                    Statistics
                </a>

                <a className="w3-button w3-round" href="/patientresume"
                    style={{ padding: "2rem", marginTop: "1rem" }}>
                    Add Patient
                </a>

                <a className="w3-button" href="#" 
                    style={{ padding: "2rem", marginTop: "1rem" }}>
                    Edit Patient
                </a>

                <a className="w3-button" href="/patientbase"
                    style={{ padding: "2rem", marginTop: "1rem" }}>
                    Patient Base
                </a>

                <a className="w3-button" href="#"
                    style={{ padding: "2rem", marginTop: "1rem" }}>
                    Import/Export
                </a>
          </div>  

        );
    }
}

export default Menu;