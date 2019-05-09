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
            organization: {
                name: null,
                description: null,
            },
            orgs: [],
            selectedOrg: [],
            role: "",
            hackathons: [],
        };
    }


    componentDidMount() {
        // console.log(localStorage.getItem('uid'));
        const uid = localStorage.getItem('uid');

        this.setState({role: localStorage.getItem('role')});
        axios.get('/userProfile', {
            params: {
                uid: uid
            }
        })
            .then(res => {
                const data = res.data;
                this.setState(() => {
                    let org = {name: null, description: null};
                    if (data.organization !== undefined) {
                        org = data.organization;
                    }
                    console.log(data);
                    return {
                        user: data,
                        organization: org,
                    }
                });

            })
            .catch(err => {
                this.setState(() => {
                    return {error: false};
                });
            });

        this.getData();
    }

    getData() {
        console.log(this.state.role);
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
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

        if (role === 'AdminUser') {
            axios.get('/hackathon')
                .then(res => {
                    console.log("hackathon", res);
                    this.setState({hackathons: res.data});
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    organizationNameList() {
        return this.state.orgs.map(org => {
            return org.name;
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const uid = localStorage.getItem("uid");
        const orgs = this.state.orgs;
        const orgId = orgs.find(org => org.name === this.state.selectedOrg[0]).id;
        console.log('orgs', this.state.orgs);
        console.log(uid);
        console.log(orgId);
        console.log(this.state.selectedOrg);
        axios.post('/joinOrg', {uid: uid, oid: orgId})
            .then(res => {
                if (res.status === 200) {
                    this.setState(() => {
                        return {
                            organization: {name: this.state.selectedOrg + " (Pending)"},
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleLeave(e) {
        const uid = localStorage.getItem("uid");
        const orgId = this.state.orgs.find(org => {
            return org.name === this.state.selectedOrg[0]
        }).id;
        axios.post('/leaveOrg', {id: uid, orgId: orgId})
            .then(res => {
                this.setState(() => {
                    return {
                        organization: {},
                    }
                });
            });
    }

    handleClose(hid) {
        const state = this.state;
        console.log('hid', hid);
        const url = '/hackathon/close';
        axios.post(url, {
            hid: hid,
        })
            .then(res => {
                state.hackathons = state.hackathons.map(h => {
                    if (h.id === hid) {
                        h.isClosed = true;
                    }
                    return h;
                });
                this.setState(state);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleFinalize(hid) {
        const state = this.state;
        const url = '/hackathon/finalize';
        axios.post(url, {
            hid: hid,
        })
            .then(res => {
                if (res.status === 200) {
                    state.hackathons = state.hackathons.map(h => {
                        if (h.id === hid) {
                            h.isFinalized = true;
                        }
                        return h;
                    });
                    this.setState(state);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    leaveButton() {
        if (this.state.organization.name != null) {
            return <Button type="button" variant="danger" onClick={this.handleLeave}>Leave</Button>
        }
    }

    createOrgButton() {
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
            // return <a href='/createOrg'>CREATE ORGANIZATION</a>
            return <Button href={'/createOrg'}>CREATE</Button>
        }

    }

    hackathonListButton() {
        return <a href='/hackathons'>Show hackations</a>
    }


    // testClose(hid) {
    //     console.log(hid);
    //     const state = this.state;
    //     state.hackathons = state.hackathons.map(h => {
    //         if (h.id === hid) {
    //             h.isClosed = true;
    //         }
    //         return h;
    //     });
    //     this.setState(state);
    // }

    handleOpen(hid) {
        axios.post('/hackathon/open', {
            hid: hid,
            date: this.today(),
        })
            .then(res => {})
            .catch(err => {console.log(err)});
    }


    today() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    showOrganization() {
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
            return (
                <div className={"orgSession"}>
                    <Card>
                        <Card.Header as="h5">Organization</Card.Header>
                        <Card.Body>
                            <div className={"org"}>
                                <Row>
                                    <Col sm={8}>
                                        <Card.Title>{this.state.organization.name}</Card.Title>
                                        <Card.Text>
                                            {this.state.organization.description}
                                        </Card.Text>
                                    </Col>
                                    <Col sm={4}>
                                        {this.leaveButton()}
                                    </Col>
                                </Row>
                            </div>
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Typeahead
                                            bsSize={"default"}
                                            clearButton
                                            labelKey="organization"
                                            id={1}
                                            options={this.organizationNameList()}
                                            placeholder="Choose a organization..."
                                            onChange={e => {
                                                this.setState(() => {
                                                    return {selectedOrg: e}
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Button variant="secondary" type={"submit"}>Request to Join</Button>
                                    </Col>
                                    <Col sm={4}>
                                        {this.createOrgButton()}
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            );
        }

        console.log(this.state);
        if (role === 'AdminUser') {
            const hackathonList = this.state.hackathons.map(h => {
                const isClosed = h.isClosed;
                const isFinalized = h.isFinalized;
                return (
                    <li key={h.id}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm={6}>
                                        <Card.Title><a href={"/hackathonEvent/" + h.id}>{h.name}</a></Card.Title>
                                        <Card.Subtitle>{h.startDate} to {h.endDate}</Card.Subtitle>
                                        <Card.Text>{h.description}</Card.Text>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            type={"button"}
                                            as={"input"}
                                            variant="warning"
                                            className={"buttons"}
                                            // disabled={isOpened}
                                            onClick={this.handleOpen.bind(this, h.id)}
                                            value={"Open"}
                                        />
                                        <Button
                                            type={"button"}
                                            as={"input"}
                                            variant="warning"
                                            className={"buttons"}
                                            disabled={isClosed}
                                            onClick={this.handleClose.bind(this, h.id)}
                                            value={"Close"}
                                        />
                                        <Button
                                            type={"button"}
                                            as={"input"}
                                            variant="warning"
                                            className={"buttons"}
                                            disabled={isFinalized}
                                            onClick={this.handleFinalize.bind(this, h.id)}
                                            value={"Finalize"}
                                        />
                                    </Col>
                                </Row>
                               
                            </Card.Body>
                        </Card>
                    </li>
                   
                    
                )
                
            }
           
            );
            return (
                <div className={"orgSession"}>
                    <ol>
                        {hackathonList}
                    </ol>
                    <div><a href={"/create_hackathon"}>Create new hackathon</a></div>
                </div>
            )
        }
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
                            <ListGroup.Item>Description: {user.aboutMe}</ListGroup.Item>
                        </ListGroup>
                        <Button variant="secondary" size="sm" href='/edit_user'>Edit</Button>
                        {/*<a href="/updateUser">edit</a>*/}
                        {this.showOrganization()}
                        <div>{this.hackathonListButton()}</div>
                    </div>
                </div>
            );
        }
    }

}


export default UserProfile;