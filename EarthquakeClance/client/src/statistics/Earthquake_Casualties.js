
import ReactDOM from "react-dom";
import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class Earthquake_Casualties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
        <Chart
            width={'100%'}
            height={'400px'}
            chartType="Bar"
            loader={<div>Recent Years Casualties </div>}
            data={[
                ['Year', 'Death(Estimate)', 'Injury'],
                ['2009', 1790, 5704],
                ['2010', 226050, 55562],
                ['2011', 21942, 11503],
                ['2012', 689, 5774],
                ['2013', 1572, 19600],
                ['2014', 756, 5236],
                ['2015', 9624, 22332],
                ['2016', 1326, 10475],
                ['2017', 1222, 15645],
                ['2018', 3176, 17089],

            ]}
            options={{
                // Material design options
                chart: {
                title: '',
                },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
            />
    );
  }
}

export default Earthquake_Casualties;
