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
            typeaheadOrg: [],
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
        };
        this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/organizations')
            .then(res => {
                const list = res.data;
                // console.log(list);
                this.setState({organization: list});
                this.setState({typeaheadOrg: list.map(org => org.name)});
            })
            .catch(err => {
                console.log(err);
            });
        axios.get("/get_all_users")
            .then(res=>{
                console.log(res.data);
                const list = res.data.map(e => {return e.email});
                this.setState({hackers: list});
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        const id = localStorage.getItem('uid');
        console.log(data);
        axios.post('/hackathon', {
            uid: parseInt(id),
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            fee: parseFloat(data.fee),
            maxSize: parseInt(data.maxSize),
            minSize: parseInt(data.minSize),
            discount: parseFloat(data.discount),
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
                <Form onSubmit={this.handleSubmit.bind(this)}>
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
                                options={this.state.typeaheadOrg}
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