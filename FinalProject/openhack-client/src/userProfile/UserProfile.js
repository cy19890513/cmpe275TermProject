
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
                id: uid
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
        axios.post('/joinOrg', {id: uid, orgId: orgId})
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
        const url = '/hackathon/close?id=' + hid;
        axios.post(url, {
            id: hid,
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
        const url = '/hackathon/finalize?id=' + hid;
        axios.post(url, {
            id: 100,
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

    showOrganization() {
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
            return (
                <div className={"orgSession"}>
                    <Card>
                        <Card.Header as="h5">Organization</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.organization.name}</Card.Title>
                            <Card.Text>
                                {this.state.organization.description}
                            </Card.Text>
                            {this.leaveButton()}
                            <Form onSubmit={this.handleSubmit.bind(this)}>
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
                                                this.setState(() => {
                                                    return {selectedOrg: e}
                                                });
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
                                    <Col sm={8}>
                                        <Card.Title>{h.name}</Card.Title>
                                        <Card.Subtitle>{h.startDate} to {h.endDate}</Card.Subtitle>
                                        <Card.Text>{h.description}</Card.Text>
                                    </Col>
                                    <Col sm={4}>
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
            });
            return (
                <div className={"orgSession"}>
                    <ol>
                        {hackathonList}
                    </ol>
                </div>
            )
        }
>>>>>>> cd305c52abb4b973c99ae2266b8e42bd7da85f42
    }


    render() {
<<<<<<< HEAD
        return (
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt />
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    Kshiti Ghelani
                                </h5>
                                <h6>
                                    Web Developer and Designer
                                </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" defaultValue="Edit Profile" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href>Website Link</a><br />
                                <a href>Bootsnipp Profile</a><br />
                                <a href>Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href>Web Designer</a><br />
                                <a href>Web Developer</a><br />
                                <a href>WordPress</a><br />
                                <a href>WooCommerce</a><br />
                                <a href>PHP, .Net</a><br />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Kshiti123</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Kshiti Ghelani</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>kshitighelani@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>123 456 7890</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>230</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6 months</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Your Bio</label><br />
                                            <p>Your detail description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default  UserProfile
