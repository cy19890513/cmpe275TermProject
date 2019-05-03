import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const data = [
  ["Seismic Magnitude Scales", "Average Earthquake Per Year"],
  ["3.0-3.9", 56000],
  ["4.0-4.9", 7000],
  ["5.0-5.9", 1100],
  ["6-0 and above", 160],
];
const options = {
  title: "",
  pieHole: 0.4,
  is3D: false
};
class Earthquake_Level extends React.Component {
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
export default Earthquake_Level;