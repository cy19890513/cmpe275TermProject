import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './TeamList.css';

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const teams = this.props.teams;
            const t = teams.map(team => {
                team.isSubmitted = false;
                return team;
            });
            this.setState({teams: t});
        }
    }

    handleSubmit(tid, e) {
        e.preventDefault();
        const grade = this.state.teams.find(t => t.id === tid).grade;

        axios.post('/hackathon/grade', {
            tid: tid,
            grade: grade,
        })
            .then(res => {
                const newTeams = this.state.teams.map(t => {
                    if (t.id === tid) {
                        t.isSubmitted = true;
                    }
                    return t;
                });
                this.setState({teams: newTeams});
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(this.state.teams);
    }

    handleChange(tid, e) {
        const teams = this.state.teams.map(t => {
            if (t.id === tid) {
                t.grade = parseFloat(e.target.value);
            }
            return t;
        });
        this.setState({teams: teams});
    }

    static showSubmit(team) {
        if (team.grade === undefined || !team.isSubmitted) {
            return "none";
        }
        return "block";
    }


    createList() {
        const teams = this.state.teams;
        return teams.map(team => {
            return (
                <li key={team.id}>
                    <Row>
                        <Col sm={"8"}>
                            <Card.Title>{team.teamName}</Card.Title>
                            <Card.Text>Submission: <a href={team.url}>{team.url}</a></Card.Text>
                        </Col>
                        <Col sm={"4"}>
                            <div className={"float-right"}>
                                <Form onSubmit={this.handleSubmit.bind(this, team.id)}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="0.0"
                                            aria-label="Grade"
                                            type={"number"}
                                            // value={this.state.teamGrade[team.id]}
                                            onChange={this.handleChange.bind(this, team.id)}
                                            required
                                        />
                                        <InputGroup.Append>
                                            <Button type={"submit"} variant="outline-secondary">Grade</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                                <div style={{display: TeamList.showSubmit(team)}} className={"notify"}>Grade submitted for team {team.teamName}</div>
                            </div>
                        </Col>
                    </Row>
                </li>
            );
        });
    }


    render() {

        return (
            <ol>
                {this.createList()}
            </ol>
        )
    }
}

export default TeamList;