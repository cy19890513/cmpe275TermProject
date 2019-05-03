import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class Top10Deaths extends Component {
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
        axios.get("http://localhost:3000/api/earthquakes_with_top_deaths", {
            params: {
                country: country,
                begin: begin,
                end: end
            }
        })
            .then(res => {
                const data = res.data;
                var chart_data = [
                    [
                        'Location',
                        'Total Deaths',
                        { role: 'style' },
                        {
                            sourceColumn: 0,
                            role: 'annotation',
                            type: 'string',
                            calc: 'stringify',
                        },
                    ]
                ];

                var rank = 1;
                for (const record of data) {
                    chart_data.push([this.toFirstUpperCase(record.country) + ", " + record.year, record.total_deaths, 'red', "#" + rank]);
                    rank++;
                }

                this.setState(() => ({ data: chart_data }));
            });
    }

    toFirstUpperCase(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div>
                <Chart
                    width={this.props.chart_width}
                    height={this.props.chart_height}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: 'Earthquake Ranking (Total Deaths)',
                        chartArea: { width: '50%' },
                        bar: { groupWidth: '85%' },
                        legend: { position: 'none' },
                        animation: {
                            duration: 3000,
                            easing: 'out',
                            startup: true,
                        },
                        hAxis: {
                            title: 'Total Deaths'
                        },
                        vAxis: {
                            title: 'Location, Year'
                        },
                        colors: ['#ff5f32']
                    }}
                />
            </div>
        );
    }
}

export default Top10Deaths;
