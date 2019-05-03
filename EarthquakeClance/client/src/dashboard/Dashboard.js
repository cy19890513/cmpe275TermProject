import React, { Component } from "react";
import "./Dashboard.css";
import EarthquakePerCountry from "./EarthquakePerCountry";
import EarthquakePerYear from "./EarthquakePerYear";
import Top10Loss from "./Top10Loss";
import Top10Deaths from "./Top10Deaths";
import Control from "./Control";
import Header from '../tools/Header';
import InfoCard from './Card';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { Slide } from "@material-ui/core";

const PaperStyle = {
    margin: 10
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countryInStat: "Global",
            totalDeaths: 0,
            totalLoss: 0,
            country: null,
            begin: null,
            end: null
        };
    }

    componentDidMount() {
        this.getStatisticsData(null, null, null);
    }

    handleSelection(selection) {
        if (selection.begin <= selection.end) {
            this.setState((prevState, props) => {
                this.perCountry.getData(selection.country, selection.begin, selection.end);
                this.perYear.getData(selection.country, selection.begin, selection.end);
                this.topDeaths.getData(selection.country, selection.begin, selection.end);
                this.topLoss.getData(selection.country, selection.begin, selection.end);
                // console.log(prevState);
                this.getStatisticsData(selection.country, selection.begin, selection.end);
                return {
                    country: selection.country,
                    begin: selection.begin,
                    end: selection.end
                }
            });
        }
    }

    getStatisticsData(country, begin, end) {
        axios
            .get("http://localhost:3000/api/get_statistics", {
                params: {
                    country: country,
                    begin: begin,
                    end: end
                }
            })
            .then(res => {
                this.setState(() => ({
                    countryInStat: country == null ? "Global" : country,
                    totalDeaths: res.data.death_total,
                    totalLoss: res.data.loss_total
                }));
                // console.log(res);
            });
    }

    render() {
        return (
            <Grid container justify={"space-around"} alignItems={"stretch"} direction={"row"}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container item xs={8} direction={"column"} justify="space-around" >

                    <Grid container item direction={"row"} justify="space-around" alignItems={"stretch"} >
                        <Grid item xs={3}>
                            <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                                <Paper style={PaperStyle}>
                                    <Control height={'170px'} width={'100%'} selection={this.handleSelection.bind(this)} />
                                </Paper>
                            </Fade>
                        </Grid>
                        <Grid item xs={3} >
                            <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                                <Paper style={PaperStyle}>
                                    <InfoCard title={"Location"} data={this.state.countryInStat} bgColor={'#3fccff'} />
                                </Paper>
                            </Fade>
                        </Grid>
                        <Grid item xs={3} >
                            <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                                <Paper style={PaperStyle}>
                                    <InfoCard title={"Total Deaths"} data={this.state.totalDeaths} bgColor={'#ff7d3d'} />
                                </Paper>
                            </Fade>
                        </Grid>
                        <Grid item xs={3} >
                            <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                                <Paper style={PaperStyle}>
                                    <InfoCard title={"Financial Loss"} data={'$' + this.state.totalLoss + 'M'} bgColor={'#eef237'} />
                                </Paper>
                            </Fade>
                        </Grid>

                    </Grid>
                    <Grid item >
                        <Zoom in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                            <Paper style={PaperStyle}>
                                <EarthquakePerCountry
                                    onRef={ref => (this.perCountry = ref)}
                                    data={this.state}
                                    chart_width={'100%'}
                                    chart_height={'590px'}
                                />
                            </Paper>
                        </Zoom>
                    </Grid>
                </Grid>


                <Grid container item xs={4} direction={"column"}>
                    <Grid item >
                        <Grow in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                            <Paper style={PaperStyle}>
                                <Top10Deaths
                                    onRef={ref => (this.topDeaths = ref)}
                                    data={this.state}
                                    chart_width={'100%'}
                                    chart_height={'260px'} />
                            </Paper>
                        </Grow>
                    </Grid>
                    <Grid item >
                        <Grow in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                            <Paper style={PaperStyle}>
                                <Top10Loss
                                    onRef={ref => (this.topLoss = ref)}
                                    data={this.state}
                                    chart_width={'100%'}
                                    chart_height={'260px'} />
                            </Paper>
                        </Grow>
                    </Grid>
                    <Grid item >
                        <Zoom in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                            <Paper style={PaperStyle}>
                                <EarthquakePerYear
                                    onRef={ref => (this.perYear = ref)}
                                    data={this.state}
                                    chart_width={'100%'}
                                    chart_height={'260px'}
                                />
                            </Paper>
                        </Zoom>
                    </Grid>
                </Grid>

                {/* <Grid item xs={4}>
                    <Paper style={PaperStyle}>
                        <Control height={'275px'} width={'100%'} selection={this.handleSelection.bind(this)} />
                    </Paper>
                </Grid> */}
                {/* <Grid item xs={8}>
                    <Zoom in={true} style={{ transitionDelay: '1250ms' }} timeout={3000}>
                        <Paper style={PaperStyle}>
                            <EarthquakePerYear
                                onRef={ref => (this.perYear = ref)}
                                data={this.state}
                                chart_width={'100%'}
                                chart_height={'275px'}
                            />
                        </Paper>
                    </Zoom>
                </Grid > */}
            </Grid >
        );
    }

}

export default Dashboard;
