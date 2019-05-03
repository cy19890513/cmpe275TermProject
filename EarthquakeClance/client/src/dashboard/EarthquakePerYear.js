import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class EarthquakePerYear extends Component {
    constructor(props) {
        super(props);
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
        axios
            .get("http://localhost:3000/api/num_earthquake_per_year", {
                params: {
                    country: country,
                    begin: begin,
                    end: end
                }
            })
            .then(res => {
                const data = res.data;
                var year_data = [
                    [
                        'Year',
                        "",
                    ]
                ];
                data.forEach(record => {
                    //if (record._id != 2019) {
                    year_data.push([record._id.toString(), record.total])
                    //}
                });
                this.setState(() => ({ data: year_data }));
                // console.log("perYear Data")
                // console.log(data);
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        return (
            <div>
                <Chart
                    width={this.props.chart_width}
                    height={this.props.chart_height}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        chart: {
                            title: "Number of Significant Earthquakes"
                        },
                        series: {
                            // Gives each series an axis name that matches the Y-axis below.
                            0: { axis: "Earthquake" }
                        },
                        axes: {
                            // Adds labels to each axis; they don't have to match the axis names.
                            y: {
                                Temps: { label: "Earthquake (Times)" }
                            }
                        },
                        colors: ['#ff5f32'],
                    }}
                />
            </div>
        );
    }
}

export default EarthquakePerYear;
