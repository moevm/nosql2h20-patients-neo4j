import React, { Component } from "react";
import Axios from "axios";

class ImportExportPage extends Component {
    constructor() {
        super()
        this.state = {
            pathToDataBase : "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value } );
    }

    importBase() {
        let requestStr = "/importBase";
        requestStr +=  "?pathToDataBase=" + this.state.pathToDataBase;
        console.log(this.state.pathToDataBase);
        console.log(requestStr);
        Axios.get(requestStr).then(res => {
            console.log(res.data);
        })
    }
    exportBase() {
        let requestStr = "/exportBase";
        requestStr +=  "?pathToDataBase=" + this.state.pathToDataBase;
        console.log(this.state.pathToDataBase);
        console.log(requestStr);
        console.log(requestStr);
        Axios.get(requestStr).then(res => {
            console.log(res.data);
        })
    }

    render() {
        return (
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <button
                    onClick={() => this.exportBase()} 
                    style={{ padding: "2rem", marginTop: "1rem" }}
                    className="w3-button"
                >
                    Export
                </button>
                <input
                    type="text" 
                    name="pathToDataBase"
                    value = {this.state.path}
                    onChange={this.handleChange}
                    placeholder="Enter path to file"
                    style={{ marginTop: "1rem", width: "300px" }}
                    className="w3-input w3-border"
                />
                <button 
                    onClick={()=>this.importBase()}
                    style={{ padding: "2rem", marginTop: "1rem" }}
                    className="w3-button"
                >
                    Import
                </button>
          </div>  

        );
    }
}

export default ImportExportPage;