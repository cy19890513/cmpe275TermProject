import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class Top10Loss extends Component {
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
        axios.get("http://localhost:3000/api/top_losses", {
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
                        'Total damage millions dollars $',
                        // 'Intensity',
                        // 'damage_millions_dollars',
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
                    chart_data.push([this.toFirstUpperCase(record.country) + ", " + record.year,
                    record.total_damage_millions_dollars,
                        // record.intensity,
                        'red', "#" + rank]);
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
                        title: 'Earthquake Ranking (Financial Loss)',
                        chartArea: { width: '50%' },
                        bar: { groupWidth: '85%' },
                        legend: { position: 'none' },
                        animation: {
                            duration: 3000,
                            easing: 'out',
                            startup: true,
                        },
                        hAxis: {
                            title: 'Total Financial Loss'
                        },
                        vAxis: {
                            title: 'Location, Year'
                        },
                    }}
                />
            </div>
        );
    }
}

export default Top10Loss;
