import React, { Component } from 'react';

import Header from '../tools/Header';
import Carousel from 'react-bootstrap/Carousel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';

let imgUrl = 'assets/1.jpg'
let styles = {
    //    backgroundImage: `url(${ imgUrl })`,
    //    backgroundRepeat  : 'no-repeat',
    //    backgroundPosition: 'center',
}

const picStyle = {
    height: 600
};

const captionStyle = { width: '100%', backgroundColor: 'rgba(100, 100, 100, 0.5)' };

class Home extends React.Component {
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

            <Grid container spacing={24} justify="center" >
                <Grid item xs={12}>
                    <Header />
                </Grid>

                <Grid item xs={12} style={{ backgroundColor: '#f0f0f0' }}>

                    <Grid container justify="center" style={{padding: 20}}>
                        <Grid item xs={8} >
                            <Fade in={true} style={{ transitionDelay: '500ms' }} timeout={3000}>
                                <Paper >
                                    <Carousel
                                        activeIndex={index}
                                        direction={direction}
                                        onSelect={this.handleSelect}
                                        interval={3000}
                                    >
                                        <Carousel.Item>
                                            <img
                                                style={picStyle}
                                                className="d-block w-100"
                                                src="assets/marc-lester-anchorage-daily-news-earthquake-aerial.jpg"
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                <div style={captionStyle}>
                                                    <h3>Earthquake damage on Vine Road, near Wasilla, Alaska, on Nov. 30, 2018.</h3>
                                                    <p>I was in my car with my nine-year-old son, headed to drop him off at school before I went to work on Nov. 30. We had made it only a couple hundred feet when the car began bouncing.</p>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                style={picStyle}
                                                className="d-block w-100"
                                                src="assets/2.jpg"
                                                alt="Second slide"
                                            />
                                            <Carousel.Caption>
                                                <div style={captionStyle}>
                                                    <h3>Earthquake devastated parts of coastal northern Ecuador in April 2016</h3>
                                                    <p>On 16 April, a magnitude 7.8 earthquake struck coastal northern Ecuador, killing hundreds of people and injuring thousands more.</p>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                style={picStyle}
                                                className="d-block w-100"
                                                src="assets/3.jpg"
                                                alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <div style={captionStyle}>
                                                    <h3>Earthquake in Italian town of Arquata del Tronto</h3>
                                                    <p>Early Wednesday Morning, a big earthquake shook several Italian towns and cities to the ground. At least 120 people are dead.</p>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                </Paper>
                            </Fade>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={7}>
                    <p style={{color: "#808080", fontSize: 13}}>
                    An earthquake (also known as a quake, tremor or temblor) is the shaking of the surface of the Earth, resulting from the sudden release of energy in the Earth's lithosphere that creates seismic waves. Earthquakes can range in size from those that are so weak that they cannot be felt to those violent enough to toss people around and destroy whole cities. The seismicity, or seismic activity, of an area is the frequency, type and size of earthquakes experienced over a period of time. The word tremor is also used for non-earthquake seismic rumbling.
                    </p>
                </Grid>
            </Grid >
        );
    }
}

export default Home;