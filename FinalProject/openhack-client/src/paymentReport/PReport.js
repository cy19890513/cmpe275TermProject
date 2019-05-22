import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

import Header from '../utils/Header';
import Card from "react-bootstrap/Card";
import PTeamList from "./PTeamList";

import './PReport.css';

class PReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hackathon: {},
            eventId: props.match.params.hid,
            teams: [],
            pdata:[]
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        const hid = this.state.eventId;

        axios.get(process.env.REACT_APP_API_URL + '/hackathon/search', {
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
        
        var url = process.env.REACT_APP_API_URL + `/hackathon/paymentStatus?hid=${this.state.eventId}`;
        axios.get(url)
            .then(res => {

                const pdata = res.data;
                this.setState({ pdata });

            })
            .catch(err => {
                var eMessage = err.response.message? "\n"+err.response.message : "";
                alert(err+eMessage);
                console.error("line 45 err");
            })
        
    }

    getTeams(uid, tid) {
        axios.get(process.env.REACT_APP_API_URL + '/hackathon/team', {
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
                        <Col sm={"3"} className={"h-info"}>
                            <h3>{hackathon.name}</h3>
                            <div>{hackathon.startDate} - {hackathon.endDate}</div>
                            <div>{hackathon.description}</div>
                        </Col>
                       
                        <Col sm={"8"}>
                        <h2>Team Payment Status Report</h2>
                         {/*
                            <Card>
                                <Card.Header>
                                    Teams
                                </Card.Header>
                        
                                <Card.Body>
                        */}
                                    <PTeamList pdata={this.state.pdata} hid={this.state.eventId}/>
                        {/*        
                                </Card.Body>
                            </Card>
                        */}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default PReport;