import React, { Component } from 'react';

import Header from '../tools/Header';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';


class News extends Component {

    render() {
        return (
            <Grid container spacing={24} justify="center">
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid container spacing={24} >
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={8}>
                        <CardGroup>
                            <Zoom in={true} style={{ transitionDelay: '100ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/surveyhit.jpg"
                                        alt="Co Donegal" />
                                    <Card.Body>
                                        <Card.Title>Surrey hit by another earthquake</Card.Title>
                                        <Card.Text>
                                            An earthquake has been confirmed in the same area of Surrey where a "swarm" of tremors were felt last year.
                                            The magnitude 2.4 tremor was recorded at about 07:45 GMT in Newdigate, near Gatwick Airport, the British Geological Survey (BGS) said.
                                        </Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/uk-england-47239242?intlink_from_url=https://www.bbc.com/news/topics/cx250ppxpygt/earthquakes&link_location=live-reporting-story">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /14 February 2019</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                            <Zoom in={true} style={{ transitionDelay: '200ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/Calialert.png" alt="Cali Alert" />
                                    <Card.Body>
                                        <Card.Title>California tests earthquake alerts</Card.Title>
                                        <Card.Text>
                                            People in Downtown Oakland California have received the first earthquake alert in the US on their mobiles.
                                            It was the first public test of the ShakeAlert system - but other countries have had similar alert systems in place for years.
                                    </Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/av/world-us-canada-47729331/california-tests-earthquake-alerts?intlink_from_url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Ftopics%2Fcx250ppxpygt%2Fearthquakes&link_location=live-reporting-map">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /28 Mar 2019</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                            <Zoom in={true} style={{ transitionDelay: '300ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/italy.jpg" />
                                    <Card.Body>
                                        <Card.Title>Italy earthquakes: Strong tremors shake central region</Card.Title>
                                        <Card.Text>
                                            Two strong earthquakes have hit central Italy, damaging buildings and injuring dozens of people.
                                            A 5.5-magnitude quake struck at 19:10 (17:10 GMT) near Visso in Macerata province, followed two hours later by a 6.1 magnitude tremor in the same area.
                                    </Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/world-europe-37782320?intlink_from_url=https://www.bbc.com/news/topics/cx250ppxpygt/earthquakes&link_location=live-reporting-story">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /27 October 2018</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                        </CardGroup>
                        <CardGroup>
                            <Zoom in={true} style={{ transitionDelay: '400ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/survey.jpg" alt="Surrey earthquakes" />
                                    <Card.Body>
                                        <Card.Title>Surrey earthquakes: Is oil drilling causing tremors?</Card.Title>
                                        <Card.Text>
                                            A series of more than 20 earthquakes in Surrey has been blamed on an oil well. A year after the first one, why are scientists still at odds over the cause?
                                            When an earthquake struck Surrey in the early hours of 27 February, worried residents dialled 999.
                                        </Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/uk-england-47816810?intlink_from_url=https://www.bbc.com/news/topics/cx250ppxpygt/earthquakes&link_location=live-reporting-story">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /15 April 2019</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                            <Zoom in={true} style={{ transitionDelay: '500ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/revisit.png" alt="Firefighters revisit" />
                                    <Card.Body>
                                        <Card.Title>Firefighters revisit the scene of Armenia's earthquake in 1988.</Card.Title>
                                        <Card.Text>
                                            People in Downtown Oakland California have received the first earthquake alert in the US on their mobiles.
                                            It was the first public test of the ShakeAlert system - but other countries have had similar alert systems in place for years.
                                    </Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/av/world-europe-46634593/firefighters-revisit-the-scene-of-armenia-s-earthquake-in-1988?intlink_from_url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Ftopics%2Fcx250ppxpygt%2Fearthquakes&link_location=live-reporting-map">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /27 Dec 2018</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                            <Zoom in={true} style={{ transitionDelay: '600ms' }} timeout={3000}>
                                <Card style={{ margin: 10 }}>
                                    <Card.Img variant="top" src="assets/lancashirefracking.jpg" />
                                    <Card.Body>
                                        <Card.Title>Lancashire fracking halted after 1.5 magnitude tremor</Card.Title>
                                        <Card.Text>
                                            Fracking at the UK's only active shale gas site has been suspended after the largest earthquake since the process started in October.
                                        The tremor with a magnitude of 1.5 was measured by the British Geological Survey at Cuadrilla's fracking site near Blackpool, Lancashire, earlier.</Card.Text>
                                        <Card.Link href="https://www.bbc.com/news/uk-england-lancashire-46526608?intlink_from_url=https://www.bbc.com/news/topics/cx250ppxpygt/earthquakes&link_location=live-reporting-story">View News</Card.Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Updated /11 December 2018</small>
                                    </Card.Footer>
                                </Card>
                            </Zoom>
                        </CardGroup>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Grid >


        );
    }
}

export default News;