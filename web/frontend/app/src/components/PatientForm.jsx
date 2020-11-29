import React, {Component} from 'react';

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "fromPatientForm",
            dataTable: [
                {
                  col1: 'Hello',
                  col2: 'World',
                },
                {
                  col1: 'react-table',
                  col2: 'rocks',
                },
                {
                  col1: 'whatever',
                  col2: 'you want',
                },
              ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("button");

        // this.props.updateData(this.state.data)
        this.props.updateData(this.state.dataTable)

    }
    
    render() {
        return (
            // <form onSubmit={this.handleSubmit}>
            //     <h2 className="w3-center">Filters</h2>
            //     <button onClick={(event) => this.props.updateData(this.state.dataTable)}></button>
            //     <div className="w3-center" style={{padding: "1rem"}}>
            //         <button className="w3-button w3-blue">
            //             Show
            //         </button>
            //     </div>
            // </form>
            <button onClick={(event) => this.props.updateData(this.state.dataTable)}></button>
        );
    }
}

export default PatientForm;