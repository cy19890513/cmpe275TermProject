import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Header from '../tools/Header';
import Grid from '@material-ui/core/Grid';
import TextFileReader from './TextFileReader';
import "./statistics.css"
import Earthquakefrequency from '../dashboard/EarthquakePerYear';
import Earthquake_House from './Earthquake_House';
import Earthquake_Casualties from './Earthquake_Casualties';
import Earthquake_Hour from './Earthquake_Time.js';
import Earthquake_Level from './Earthquake_Level';

class Frequency extends Component {

    render() {
        var myTxt = require("./text/frequency.txt");
        return (
            <Grid container spacing={24} justify="center" >
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>

                    <Grid item xs={8}>
                        <h3>Earthquake in the Past 100 Years</h3>
                        <Paper><Earthquakefrequency /></Paper>
                        <div className="content" >
                            <TextFileReader className="content" txt={myTxt} />
                        </div>
                        <h3>Recent Years Earthquake Casualties</h3>
                        <Paper><Earthquake_Casualties /></Paper>
                        <div className="content">
                            Recent Years Earthquake Casualties - This chart illustrate the earthquake casualties in the recent 10 years.
                        </div>
                        <h3>Recent Years Earthquake House Damages</h3>
                        <Paper><Earthquake_House /></Paper>
                        <div className="content" >
                            {/* <TextFileReader className="content" txt={myTxt} /> */}
                            Recent Years Earthquake House Damages - This chart illustrate the house damages in the earthquakes in the recent 10 years.
                        </div>
                        <h3>Earthquake Magnitude Scale</h3>
                        <Paper><Earthquake_Level /></Paper>
                        <div className="content" >
                            {/* <TextFileReader className="content" txt={myTxt} /> */}
                            Earthquake Magnitude Scale - This chart illustrate the earthquake magnitude scale distribute in the records.
                        </div>
                        <h3>Earthquake Occurance Time</h3>
                        <Paper><Earthquake_Hour /></Paper>
                        <div className="content">
                            {/* <TextFileReader className="content" txt={myTxt} /> */}
                            Earthquake Occurance Time - This chart describes the time that earthquake occurs.
                        </div>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Frequency;