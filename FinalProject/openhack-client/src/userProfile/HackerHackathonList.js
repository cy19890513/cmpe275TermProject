import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Col, Row, Collapse} from "react-bootstrap";

import Accordion from 'react-bootstrap/Accordion';

import axios from 'axios';


class HackerHackathonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hackathons: [],
            uid: localStorage.getItem('uid'),
            open: true,
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + '/hackathons', {
            params: {
                uid: this.state.uid,
            }
        })
            .then(res => {
                // console.log("hack", res.data);
                this.setState({hackathons: res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    createEvalBtn(isJudge, hid) {
        const m = this.props.email;
        if (isJudge) {
            return (
                <a role={"button"} className={"btn btn-outline-primary"} href={'/hackathon/eval/' + hid}>
                    Evaluate
                </a>
            )
        }
        return (
            <a role={"button"} className={"btn btn-outline-primary"} href={'/hackathon/' + hid + '/submit'}>
                Submit
            </a>
        )
    }

    showStatus(h) {
        if (h.isClosed) {
            return "(Closed)";
        }
        if (h.isFinalized) {
            return "(Finalized)";
        }
    }

    hackathonList() {
        return this.state.hackathons.map(h => {
            return (
                <li key={h.id}>
                    <Row>
                        <Col sm={6}>
                            <Card.Title><a href={"/hackathonEvent/" + h.id}>{h.name}</a></Card.Title>
                            <Card.Subtitle>{h.startDate} to {h.endDate} {this.showStatus(h)}</Card.Subtitle>
                            <Card.Text>{h.description}</Card.Text>
                        </Col>
                        <Col sm={6}>
                            <div className={"float-right"}>
                                {this.createEvalBtn(h.isJudge, h.id)}
                            </div>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    render() {
        const { open } = this.state;

        return (
            <Card>
                <Card.Header onClick={() => this.setState({ open: !open })}>My Hackathons</Card.Header>
                <Collapse in={this.state.open}>
                        <Card.Body>
                            <ol className={"hackathon-list"}>
                                {this.hackathonList()}
                            </ol>
                        </Card.Body>
                </Collapse>
            </Card>
        )
    }
}

export default HackerHackathonList;