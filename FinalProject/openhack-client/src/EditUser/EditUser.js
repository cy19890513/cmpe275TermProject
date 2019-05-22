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
            street: null,
            city: null,
            state: null,
            zip: null,
            aboutMe: null,
            portrait: null

        };
        this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // console.log(localStorage.getItem('uid'));
        const uid = localStorage.getItem('uid');

        axios.get(process.env.REACT_APP_API_URL + '/userProfile', {
            params: {
                uid: uid
            }
        })
            .then(res => {
                const data = res.data;
                // console.log(data);
                this.setState({name: data.name});
                this.setState({businessTitle: data.BusinessTitle});
                this.setState({street: data.Address.street});
                this.setState({city: data.Address.city});
                this.setState({state: data.Address.state});
                this.setState({zip: data.Address.zip});
                this.setState({aboutMe: data.Description});
                this.setState({portrait: data.portrait});
            })
            .catch(err => {
                // alert(err);
                // console.log(err);
                this.setState(() => {
                    return {error: false};
                });
            });


    }



    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        const id = localStorage.getItem('uid');
        // console.log(data);
        axios.post(process.env.REACT_APP_API_URL + '/userProfile', {
            uid: parseInt(id),
            name: data.name,
            businessTitle: data.businessTitle,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            aboutMe: data.aboutMe,
            portrait: data.portrait

        })
            .then(res => {
                this.props.history.push('/userprofile');
            })
            .catch(err => {
                var eMessage = err.response.message? "\n"+err.response.message : "";
                alert(err+eMessage);
                console.log(err);
            });
    }



    render() {
        const data = this.state;
        return (
            <div>
                <Header/>
                <h1>Edit User</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group as={Row} controlId="name">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"} placeholder="User" value={data.name} onChange={e => {this.setState({name: e.target.value})}} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId={"aboutMe"}>
                        <Form.Label column sm={"2"}>
                            AboutMe
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control as={"textarea"}   value={data.aboutMe} onChange={e => {this.setState({aboutMe: e.target.value})}} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="businessTitle">
                        <Form.Label column sm="2">
                            Business Title
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"}   value={data.businessTitle} onChange={e => {this.setState({businessTitle: e.target.value})}} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="street">
                        <Form.Label column sm="2">
                            Street
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"}   value={data.street} onChange={e => {this.setState({street: e.target.value})}} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="city">
                        <Form.Label column sm="2">
                            City
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type={"text"}   value={data.city} onChange={e => {this.setState({city: e.target.value})}} />
                        </Col>
                    </Form.Group><Form.Group as={Row} controlId="state">
                    <Form.Label column sm="2">
                        State
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type={"text"}   value={data.state} onChange={e => {this.setState({state: e.target.value})}} />
                    </Col>
                    </Form.Group>
                <Form.Group as={Row} controlId="zip">
                    <Form.Label column sm="2">
                        Zip
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type={"text"}   value={data.zip} onChange={e => {this.setState({zip: e.target.value})}} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="portrait">
                    <Form.Label column sm="2">
                        Portrait
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type={"text"}   value={data.portrait} onChange={e => {this.setState({portrait: e.target.value})}} />
                    </Col>
                </Form.Group>
                

                    <Button type="submit">Edit User</Button>
                </Form>
            </div>
        );
    }
}

export default EditUser;