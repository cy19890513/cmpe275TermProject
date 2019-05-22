import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import axios from 'axios';

import Header from '../utils/Header';
import './CreateOrg.css';


class CreateOrg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            street: null,
            city: null,
            state: null,
            zip: null
        };
        this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        const id = localStorage.getItem('uid');
        // console.log(data);
        axios.post(process.env.REACT_APP_API_URL + '/organization', {
            uid: id,
            name: data.name,
            description: data.description,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip
        })
            .then(res=> {
                alert("New organization created");
                this.props.history.push('/userprofile');
            })
            .catch(err => {
                var eMessage = err.response.message? "\n"+err.response.message : "";
                alert(err+eMessage);
                console.log(err);
            });
    }



    render() {
        return (
            <div>
                <Header/>
                <h1>Create a New Organization</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group as={Row} controlId="name">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} placeholder="Organization" onChange={e => {this.setState({name: e.target.value})}} required/>
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

                    <Form.Group as={Row} controlId="street">
                        <Form.Label column sm="2">
                            Street
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} onChange={e => {this.setState({street: e.target.value})}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="city">
                        <Form.Label column sm="2">
                            City
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} onChange={e => {this.setState({city: e.target.value})}} required/>
                        </Col>
                    </Form.Group><Form.Group as={Row} controlId="state">
                    <Form.Label column sm="2">
                        State
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type={"text"} onChange={e => {this.setState({state: e.target.value})}} required/>
                    </Col>
                </Form.Group><Form.Group as={Row} controlId="zip">
                    <Form.Label column sm="2">
                        Zip
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type={"text"} onChange={e => {this.setState({zip: e.target.value})}} required/>
                    </Col>
                </Form.Group>
                    <Button type="submit">Create Organization</Button>
                </Form>
            </div>
        );
    }
}

export default CreateOrg;