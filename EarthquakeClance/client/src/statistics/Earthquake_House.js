
import ReactDOM from "react-dom";
import React, { Component } from "react";
import Chart from "react-google-charts";
import axios from "axios";

class Earthquake_House extends Component {
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
                ['Year', 'House Damage'],
                ['2009', 24077],
                ['2010', 119151],
                ['2011', 118165],
                ['2012', 66333],
                ['2013', 62560],
                ['2014', 33092],
                ['2015', 335495],
                ['2016', 89296],
                ['2017', 23090],
                ['2018', 12222],

            ]}
            options={{
                // Material design options
               
                chart: {
                  color: "#00acc1",
                fontSize: 36,
                title: '',
                fontSize: 24,
                },
           
            }}
            
            />
    );
  }
}

export default Earthquake_House;
