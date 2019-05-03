import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Header from '../tools/Header';
import Grid from '@material-ui/core/Grid';
import TextFileReader from './TextFileReader';
// import "./statistics.css"
import EarthquakePerCountry from '../dashboard/EarthquakePerCountry';

class Map extends Component {

    render() {
        var myTxt = require("./text/map.txt");
        return (
            <Grid container spacing={24} justify="center">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs={8} className="shadow content" >
                    <div><EarthquakePerCountry chart_width={'90%'} chart_height={'90%'} align="right" /></div>
                    <div className="content">
                        <TextFileReader className="content" txt={myTxt} />
                    </div>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        );
    }
}

export default Map;
