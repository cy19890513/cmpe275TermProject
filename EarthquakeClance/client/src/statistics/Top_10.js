import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Header from '../tools/Header';
import Grid from '@material-ui/core/Grid';
import TextFileReader from './TextFileReader';
import "./statistics.css"
import Top10Deaths from '../dashboard/Top10Deaths';
import Top10Loss from '../dashboard/Top10Loss';

class Deadliest extends Component {
    render() {
        var myTxt = require("./text/deadliest.txt");
        var myTxt2 = require("./text/loss.txt");
        return (
            <Grid container spacing={24} justify="center" >
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8} className="shadow">
                        <h3>Top 10 Deadliest Earthquake</h3>
                        <Paper><Top10Deaths /></Paper>
                        <div className="content">
                            <TextFileReader className="content" txt={myTxt} />
                        </div>
                        <h3>Top 10 Financial Loss Earthquake</h3>
                        <Paper><Top10Loss chart_height={'200%'} chart_width={'100%'} /></Paper>
                        <div className="content">
                            <TextFileReader className="content" txt={myTxt2} />
                        </div>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Deadliest;