/* eslint-disable react/style-prop-object */
import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class EarthquakePerCountry extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     chart_height: 0,
        //     chart_width: 0,
        //     country: null,
        //     begin: null,
        //     end: null
        // }
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        if (this.props.onRef !== undefined) {
            this.props.onRef(this);
        }
        this.getData(null, null, null);
    }

    componentWillUnmount() {
        if (this.props.onRef !== undefined) {
            this.props.onRef(undefined)
        }
    }

    getData(country, begin, end) {
        // console.log(this.props);
        axios
            .get("http://localhost:3000/api/num_earthquake_per_country", {
                params: {
                    country: country,
                    begin: begin,
                    end: end
                }
            })
            .then(res => {
                const data = res.data;
                const map_data = [["Country", "# of Earthquake"]];
                data.forEach(country => {
                    map_data.push([this.convertCountryName(country._id), country.total]);
                });
                this.setState(() => ({ data: map_data }));
                // console.log(map_data);
            })
            .catch(error => {
                console.warn(error);
            });
        // console.log(this.state);
    }


    convertCountryName(country_name) {
        switch (country_name) {
            case "USA":
                return "UNITED STATES";
            case "UK":
                return "UNITED KINGDOM";
            default:
                return country_name;
        }
    }

    render() {
        return (
            <div>
                <h3>Number of Earthquake in Record</h3>
                <Chart
                    width={this.props.chart_width}
                    height={this.props.chart_height}
                    chartType="GeoChart"
                    data={this.state.data}
                    mapsApiKey='AIzaSyAFO0lrruVQh81nQ5HLjtpMJDrvPeaUpwE'
                    options={{
                        colorAxis: { colors: ['#fff4ed', '#ff5000'] },
                        backgroundColor: '#81d4fa',
                        datalessRegionColor: 'white',
                        defaultColor: 'white',
                    }}
                />
            </div>
        );
    }
}

export default EarthquakePerCountry;
