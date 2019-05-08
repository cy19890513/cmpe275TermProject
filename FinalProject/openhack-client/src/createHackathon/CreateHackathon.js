import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import axios from 'axios';

import Header from '../utils/Header';
import './CreateHackathon.css';


class CreateHackathon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organization: [],
            hackers: [],
            name: null,
            startDate: null,
            endDate: null,
            description: null,
            fee: null,
            maxSize: null,
            minSize: null,
            discount: null,
            sponsors: [],
            judges: [],
        }
    }

    componentDidMount() {
        axios.get('/organization')
            .then(res => {
                const list = res.data;
                // console.log(list);
                this.setState({organization: list});
            })
            .catch(err => {
                console.log(err);
            });
        axios.get("/findAll")
            .then(res=>{
                const list = res.data.map(e => {return e.email});
                // console.log(list);
                this.setState({hackers: list});
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        axios.post('http://localhost:8080/hackathon', {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            fee: data.fee,
            maxSize: data.maxSize,
            minSize: data.minSize,
            discount: data.discount,
            sponsors: data.sponsors,
            judges: data.judges,
        })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        return (
            <div>
                <Header/>
                <h1>Create a New Hackathon</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="eventName">
                        <Form.Label column sm="2">
                            Event Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} placeholder="Hackathon" onChange={e => {this.setState({name: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"startDate"}>
                        <Form.Label column sm={"2"}>
                            Start Date
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"date"} onChange={e => {this.setState({startDate: e.target.value})}} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"endDate"}>
                        <Form.Label column sm={"2"}>
                            End Date
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"date"} onChange={e => {this.setState({endDate: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"description"}>
                        <Form.Label column sm={"2"}>
                            Description
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control as={"textarea"} onChange={e => {this.setState({description: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"fee"}>
                        <Form.Label column sm={"2"}>
                            Fee
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"number"} onChange={e => {this.setState({fee: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"maxSize"}>
                        <Form.Label column sm={"2"}>
                            Team Max Size
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"number"} onChange={e => {this.setState({maxSize: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"minSize"}>
                        <Form.Label column sm={"2"}>
                            Team Min Size
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"number"} onChange={e => {this.setState({minSize: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"judge"}>
                        <Form.Label column sm={"2"}>
                            Judges
                        </Form.Label>
                        <Col sm={"10"}>
                            <Typeahead
                                clearButton
                                // defaultSelected={this.state.organization.slice(0, 5)}
                                labelKey="Judge"
                                id={1}
                                multiple
                                options={this.state.hackers}
                                placeholder="Choose a hacker..."
                                onChange={e => {this.setState({judges: e})}}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"sponsors"}>
                        <Form.Label column sm={"2"}>
                            Sponsor
                        </Form.Label>
                        <Col sm={"10"}>
                            <Typeahead
                                clearButton
                                // defaultSelected={this.state.organization.slice(0, 5)}
                                labelKey="organization"
                                id={1}
                                multiple
                                options={this.state.organization}
                                placeholder="Choose a organization..."
                                onChange={e => {this.setState({sponsors: e})}}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"discount"}>
                        <Form.Label column sm={"2"}>
                            Discount
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"number"} onChange={e => {this.setState({discount: e.target.value})}}/>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Create Hackathon</Button>
                </Form>
            </div>
        );
    }
}

export default CreateHackathon;