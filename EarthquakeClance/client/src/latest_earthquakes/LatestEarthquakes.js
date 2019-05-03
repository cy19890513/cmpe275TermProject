import React, { Component } from 'react';

import Header from '../tools/Header';
import Carousel from 'react-bootstrap/Carousel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import MapContainer from './MapContainer';

const mainMapStyles = {
    position: "relative",
    width: "100%",
    padding: 10
};

const mapStyles = {
    position: "relative",
    width: "100%",
    padding: 10
};

const textStyle = {
    paddingLeft: 10
};

class LatestEarthquakes extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
            height: 10
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <div>
                <Header />
                <Grid container justify="center">
                    <Grid item xs={9}>
                        <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={3000}>
                            <div style={mainMapStyles}>
                                <Paper>
                                    <h3>Latest Significant Earthquakes Glance</h3>
                                    <MapContainer
                                        positions={[
                                            { lat: -8.418, lng: 116.52 },
                                            { lat: -14.684, lng: -70.127 },
                                            { lat: 29.498, lng: 104.632 }
                                        ]}
                                        center={{ lat: 0, lng: 0 }}
                                        zoom={2}
                                        height={'450px'} />
                                </Paper>
                            </div>
                        </Fade>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={3}>
                        <Zoom in={true} style={{ transitionDelay: '500ms' }} timeout={2000}>
                            <div style={mapStyles}>
                                <Paper style={{ backgroundColor: '#ffff47' }}>
                                    <MapContainer
                                        positions={[
                                            { lat: -8.418, lng: 116.52 }
                                        ]}
                                        center={
                                            { lat: -8.418, lng: 116.52 }
                                        }
                                        zoom={8}
                                        height={'250px'} />
                                    <div style={textStyle}>
                                        <h5>Lombok Island, Indonesia</h5>
                                        <h6>Magnitude: 5.5</h6>
                                        <h6>Mar 17, 2019. 07:07:27</h6>
                                    </div>
                                </Paper>
                            </div>
                        </Zoom>
                    </Grid>
                    <Grid item xs={3}>
                        <Zoom in={true} style={{ transitionDelay: '750ms' }} timeout={2000}>
                            <div style={mapStyles}>
                                <Paper style={{ backgroundColor: '#f50057' }}>
                                    <MapContainer
                                        positions={[
                                            { lat: -14.684, lng: -70.127 },
                                        ]}
                                        center={
                                            { lat: -14.684, lng: -70.127 }
                                        }
                                        zoom={8}
                                        height={'250px'} />
                                    <div style={textStyle}>
                                        <h5>Arequipa, Peru</h5>
                                        <h6>Magnitude: 7</h6>
                                        <h6>Mar 1, 2019. 08:50:41</h6>
                                    </div>
                                </Paper>
                            </div>
                        </Zoom>
                    </Grid>
                    <Grid item xs={3}>
                        <Zoom in={true} style={{ transitionDelay: '1000ms' }} timeout={2000}>
                            <div style={mapStyles}>
                                <Paper style={{ backgroundColor: '#44fff2' }}>
                                    <MapContainer
                                        positions={[
                                            { lat: 29.498, lng: 104.632 }
                                        ]}
                                        center={
                                            { lat: 29.498, lng: 104.632 }
                                        }
                                        zoom={8}
                                        height={'250px'}
                                    />
                                    <div style={textStyle}>
                                        <h5>Sichuan Province, China</h5>
                                        <h6>Magnitude: 4.9</h6>
                                        <h6>Feb 25, 2019. 05:15:59</h6>
                                    </div>
                                </Paper>
                            </div>
                        </Zoom>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

export default LatestEarthquakes;