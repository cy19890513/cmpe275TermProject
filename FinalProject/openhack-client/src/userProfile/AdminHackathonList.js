import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";

import './HackathonList.css';

class AdminHackathonList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hackathons: [],
            uid: parseInt(localStorage.getItem('uid'))
        }

    }

    componentDidMount() {
        axios.get('/hackathon')
            .then(res => {
                console.log("hackathon", res);
                this.setState({hackathons: res.data});
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    today() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    handleOpen(hid) {
        axios.post('/hackathon/open', {
            uid: this.state.uid,
            hid: hid,
            date: this.today(),
        })
            .then(res => {
                this.forceUpdate();
                alert("Now open for submission");
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleClose(hid) {
        const state = this.state;
        console.log('hid', hid);
        const url = '/hackathon/close';
        axios.post(url, {
            uid: this.state.uid,
            hid: hid,
        })
            .then(res => {
                state.hackathons = state.hackathons.map(h => {
                    if (h.id === hid) {
                        h.isClosed = true;
                    }
                    return h;
                });
                this.setState(state);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    handleFinalize(hid) {
        const state = this.state;
        const url = '/hackathon/finalize';
        const data = {
            uid: this.state.uid,
            hid: hid,
        };
        console.log("data", data);
        axios.post(url, {
            uid: this.state.uid,
            hid: hid,
        })
            .then(res => {
                if (res.status === 200) {
                    state.hackathons = state.hackathons.map(h => {
                        if (h.id === hid) {
                            h.isFinalized = true;
                        }
                        return h;
                    });
                    this.setState(state);
                }
            })
            .catch(err => {
                alert(err.response.data);
                console.log(err);
            });
    }

    hackathonList() {
        return this.state.hackathons.map(h => {
            const isClosed = h.isClosed;
            const isFinalized = h.isFinalized;
            return (
                <li key={h.id}>
                    <Row>
                        <Col sm={6}>
                            <Card.Title><a href={"/hackathonEvent/" + h.id}>{h.name}</a></Card.Title>
                            <Card.Subtitle className={"h-date"}>{h.startDate} to {h.endDate}</Card.Subtitle>
                            <Card.Text className={"h-desc"}>{h.description}</Card.Text>
                        </Col>
                        <Col sm={6}>
                            <div className={"float-right"}>
                                <div>
                                    <Button
                                        type={"button"}
                                        as={"input"}
                                        variant="warning"
                                        className={"buttons"}
                                        // disabled={isOpened}
                                        onClick={this.handleOpen.bind(this, h.id)}
                                        value={"Open"}
                                    />
                                    <Button
                                        type={"button"}
                                        as={"input"}
                                        variant="warning"
                                        className={"buttons"}
                                        disabled={isClosed}
                                        onClick={this.handleClose.bind(this, h.id)}
                                        value={"Close"}
                                    />
                                    <Button
                                        type={"button"}
                                        as={"input"}
                                        variant="warning"
                                        className={"buttons"}
                                        disabled={isFinalized}
                                        onClick={this.handleFinalize.bind(this, h.id)}
                                        value={"Finalize"}
                                    />
                                </div>
                                <div className={"float-right"}>
                                    <a
                                        role={"button"}
                                        className={"buttons btn btn-primary"}
                                        href={"/hackathon/pReport/" + h.id}
                                    >
                                        Payments
                                    </a>
                                    <a
                                        role={"button"}
                                        className={"buttons btn btn-primary"}
                                        href={"/hackathon/" + h.id + "/report"}
                                    >
                                        Report
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    render() {
        return (
            <Card>
                <Card.Header as="h5">
                    <span>Hackathons</span>
                    <span className={"float-right"}>
                        <a role={"button"} className={"btn btn-outline-primary btn-sm"} href={"/create_hackathon"}>
                            New
                        </a>
                    </span>
                </Card.Header>
                <Card.Body>
                    <ol className={"hackathon-list"}>
                        {this.hackathonList()}
                    </ol>
                </Card.Body>
            </Card>
            // <div><a href={"/create_hackathon"}>Create new hackathon</a></div>

        );
    }
}

export default AdminHackathonList;