import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Axios from "axios";

class Statistic extends Component {

    constructor() {
        super()
        this.data = [];
        this.state = {
            diseaseName : "",
            scale : "",
            periodBegin : "",
            periodEnd : "",
            country : "",
            city : "",
            gender : "",
            ageBegin : 0,
            ageEnd : 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    updateData() {
        let requestStr = "/getStatistic"
        requestStr +=  "?diseaseName=" + this.state.diseaseName
        requestStr +=  "&scale=" + this.state.scale
        requestStr +=  "&periodBegin=" + this.state.periodBegin
        requestStr +=  "&periodEnd=" + this.state.periodEnd
        requestStr +=  "&country=" + this.state.country
        requestStr +=  "&city=" + this.state.city
        requestStr +=  "&gender=" + this.state.gender
        requestStr +=  "&ageBegin=" + this.state.ageBegin
        requestStr +=  "&ageEnd=" + this.state.ageEnd

        Axios.get(requestStr).then(res => {
            this.data = res.data
            this.setState( { data : res.data } )
        })
    }

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value } );
    }

    render() {
        return (
        <div>
            <BarChart width={600} height={300} data={this.data}>
                <XAxis dataKey="xVal" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="yVal" fill="#8884d8" barSize={30} />
            </BarChart>
                <div>
                    <label>
                        Disease:
                        <input type="text" name="diseaseName" value={this.state.diseaseName} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        Scale:
                        <input type="text" name="scale" value={this.state.scale} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        PeriodBegin:
                        <input type="text" name="periodBegin" value={this.state.periodBegin} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        PeriodEnd:
                        <input type="text" name="periodEnd" value={this.state.periodEnd} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        country:
                        <input type="text" name="country" value={this.state.country} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        city:
                        <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        gender:
                        <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        ageBegin:
                        <input type="text" name="ageBegin" value={this.state.ageBegin} onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label>
                        ageEnd:
                        <input type="text" name="ageEnd" value={this.state.ageEnd} onChange={this.handleChange} />
                    </label>
                </div>

            <button onClick={this.updateData}>
                Update statistic
            </button>
        </div>
        );
    }
}

export default Statistic;
