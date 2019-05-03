import React, { Component } from "react";
import Chart from "react-google-charts";

const data = [
  ["Seismic Magnitude Scales", "Average Earthquake Per Year"],
  ["Morning, 06:01-12:00", 1302],
  ["Afternoon, 12:01-17:00", 1198],
  ["Evenning, 17:01-20:00", 984],
  ["Night, 20:01-06:00", 2734]
];
const options = {
  title: "",
  pieHole: 0.4,
  is3D: false
};
class Earthquake_Time extends React.Component {
  render() {
    return (
      <div className="Safety">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
      
    );
  }
}
export default Earthquake_Time;