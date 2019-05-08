import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import axios from 'axios';

import Header from '../utils/Header';
import './EditUser.css';


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            businessTitle: null,
            address: {},
            aboutMe: null,
            portrait: null
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        axios.post('http://localhost:8080/userProfile', {
            uid: localStorage.getItem('uid'),
            name: data.name,
            businessTitle: data.businessTitle,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            aboutMe: data.aboutMe,
            portrait: data.protrait
        })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        return (
            <div>
                <Header/>
                <h1>Edit the User</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="name">
                        <Form.Label column sm="2">
                             Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} placeholder="User" onChange={e => {this.setState({name: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"businessTitle"}>
                        <Form.Label column sm={"2"}>
                            Business Title
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"text"} onChange={e => {this.setState({businessTitle: e.target.value})}} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"street"}>
                        <Form.Label column sm={"2"}>
                            Street
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"text"} onChange={e => {this.setState({street: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"city"}>
                        <Form.Label column sm={"2"}>
                            City
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control as={"text"} onChange={e => {this.setState({city: e.target.value})}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={"state"}>
                        <Form.Label column sm={"2"}>
                            State
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control as={"text"} onChange={e => {this.setState({state: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"zip"}>
                        <Form.Label column sm={"2"}>
                            Zip
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"text"} onChange={e => {this.setState({zip: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"aboutMe"}>
                        <Form.Label column sm={"2"}>
                            AboutMe
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"text"} onChange={e => {this.setState({aboutMe: e.target.value})}} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"protrait"}>
                        <Form.Label column sm={"2"}>
                             Protrait
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control type={"text"} onChange={e => {this.setState({protrait: e.target.value})}} required/>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Edit User</Button>
                </Form>
            </div>
        );
    }
}

export default EditUser;