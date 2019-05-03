import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Header from '../tools/Header';
import Grid from '@material-ui/core/Grid';
import TextFileReader from './TextFileReader';
import "./statistics.css"
import Top10Loss from '../dashboard/Top10Loss';

class Loss extends Component {

    render() {
        var myTxt = require("./text/loss.txt");
        return (
            <Grid container spacing={24} justify="center">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={24} >
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8} className="background">
                        <Paper><Top10Loss /></Paper>
                        <div className="content">
                            <TextFileReader className="content" txt={myTxt} />
                        </div>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Loss;