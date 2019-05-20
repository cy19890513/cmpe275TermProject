import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

import Header from '../utils/Header';
import Card from "react-bootstrap/Card";
import TeamList from "./TeamList";

import './Evaluation.css';

class Evaluation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hackathon: {},
            teams: [],
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        const hid = this.props.match.params.hid;

        axios.get('/hackathon/search', {
            params: {
                uid: uid,
                hid: hid,
            }
        })
            .then(res => {
                const hackathon = res.data;
                const teams = hackathon.teams;
                teams.forEach(team => this.getTeams(uid, team.id));
                this.setState({hackathon: hackathon});
            })
            .catch(err => {
                console.log(err);
            });
    }

    getTeams(uid, tid) {
        axios.get('/hackathon/team', {
            params: {
                uid: uid,
                tid: tid,
            }
        })
            .then(res => {
                const teams = this.state.teams;
                const team = res.data;
                teams.push(team);
                this.setState({teams: teams});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const hackathon = this.state.hackathon;
        const teams = this.state.teams;

        return (
            <div>
                <Header/>

                <div className={"grade-content"}>
                    <Row>
                        <Col sm={"4"} className={"h-info"}>
                            <h3>{hackathon.name}</h3>
                            <div className={"h-date"}>{hackathon.startDate} to {hackathon.endDate}</div>
                            <div className={"h-desc"}>{hackathon.description}</div>
                        </Col>

                        <Col sm={"8"}>
                            <Card>
                                <Card.Header>
                                    Teams
                                </Card.Header>

                                <Card.Body>
                                    <TeamList teams={teams}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default Evaluation;