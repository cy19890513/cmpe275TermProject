import React, {Component} from 'react';
import {Button, Form, Col, Row, FormGroup, FormControl, FormlLabel, Card} from "react-bootstrap";
import {userService} from '../_services/user.service';
import Header from '../utils/Header';
import Org from '../utils/Org';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import './userProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: false,
            organization: {},
            orgs: [],
            selectOrg: null,
        };
    }


    componentDidMount() {
        console.log(localStorage.getItem('uid'));
        axios.get('/userProfile', {
            params: {
                id: localStorage.getItem('uid')
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({user: data});
            })
            .catch(err => {
                this.setState(() => {
                    return {error: false};
                });
            });

        axios.get('/organizations')
            .then(res => {
                this.setState(() => {
                    return {orgs: res.data};
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    organizationNameList() {
        return this.state.orgs.map(org => {
            return org.name;
        });
    }

    handleSubmit(e) {
        
    }

    render() {
        if (this.state.error) {
            return (
                <div><a href="/login">Please Login</a></div>
            );
        } else {
            const user = this.state.user;
            const addr = user.address;
            let address;
            if (addr != null) {
                address = addr.street == null ? "" : (addr.street + ", ") +
                addr.city == null ? "" : (addr.city + ", ") +
                addr.state == null ? "" : (addr.state + " ") +
                addr.zip == null ? "" : (addr.zip);
            }
            // console.log(user);
            //
            return (
                <div>
                    <Header/>
                    <div className="UserProfile">

                        <h1> welcome {user.username}</h1>
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdddVm4g4gaYFb56WgKroI5kJ-H4ONMEvFbQqrd49FkGf7rrZSSA'/>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Name: {user.name}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>BusinessTitle: {user.businessTitle}</ListGroup.Item>
                            <ListGroup.Item>Address: {address}</ListGroup.Item>
                            <ListGroup.Item>Description: {user.discription}</ListGroup.Item>
                        </ListGroup>
                        {/*<a href="/updateUser">edit</a>*/}
                        <div className={"orgSession"}>
                            <Card>
                                <Card.Header as="h5">Organization</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.organization.name}</Card.Title>
                                    <Card.Text>
                                        {this.state.organization.description}
                                    </Card.Text>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group as={Row}>
                                            <Col sm={8}>
                                                <Typeahead
                                                    bsSize={"default"}
                                                    clearButton
                                                    labelKey="organization"
                                                    id={1}
                                                    options={this.organizationNameList()}
                                                    placeholder="Choose a organization..."
                                                    onChange={e => {
                                                        this.setState(()=> {return {selectOrg: e}});
                                                    }}
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                <Button type={"submit"}>Request to Join</Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }
    }

}


export default UserProfile;