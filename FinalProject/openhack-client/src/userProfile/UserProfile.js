import React, {Component} from 'react';
import {Button, Form, Col, Row, FormGroup, FormControl, FormlLabel, Card} from "react-bootstrap";
import Header from '../utils/Header';
import axios from 'axios';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Accordion from 'react-bootstrap/Accordion';
import './userProfile.css';

import Organization from './Organization';
import AdminHackathonList from './AdminHackathonList';
import HackerHackathonList from "./HackerHackathonList";

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
                    console.log('user', data);
                    return {
                        user: data,
                        organization: org,
                    }
                });

            })
            .catch(err => {
                alert(err);
                this.setState(() => {
                    return {error: false};
                });
            });

        // this.getData();
    }

    getData() {
        // console.log(this.state.role);
        const role = localStorage.getItem('role');
        // if (role === 'hackerUser') {
        //     axios.get('/organizations')
        //         .then(res => {
        //             this.setState(() => {
        //                 return {orgs: res.data};
        //             })
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // }

        // if (role === 'AdminUser') {
        //     axios.get('/hackathon')
        //         .then(res => {
        //             console.log("hackathon", res);
        //             this.setState({hackathons: res.data});
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // }
    }

    // organizationNameList() {
    //     return this.state.orgs.map(org => {
    //         return org.name;
    //     });
    // }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     const uid = localStorage.getItem("uid");
    //     const orgs = this.state.orgs;
    //     const orgId = orgs.find(org => org.name === this.state.selectedOrg[0]).id;
    //     console.log('orgs', this.state.orgs);
    //     console.log(uid);
    //     console.log(orgId);
    //     console.log(this.state.selectedOrg);
    //     axios.post('/joinOrg', {uid: uid, oid: orgId})
    //         .then(res => {
    //             if (res.status === 200) {
    //                 this.setState(() => {
    //                     return {
    //                         organization: {name: this.state.selectedOrg + " (Pending)"},
    //                     }
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // handleLeave(e) {
    //     const uid = localStorage.getItem("uid");
    //     const orgId = this.state.orgs.find(org => {
    //         return org.name === this.state.selectedOrg[0]
    //     }).id;
    //     axios.post('/leaveOrg', {id: uid, orgId: orgId})
    //         .then(res => {
    //             this.setState(() => {
    //                 return {
    //                     organization: {},
    //                 }
    //             });
    //         });
    // }

    // handleClose(hid) {
    //     const state = this.state;
    //     console.log('hid', hid);
    //     const url = '/hackathon/close';
    //     axios.post(url, {
    //         hid: hid,
    //     })
    //         .then(res => {
    //             state.hackathons = state.hackathons.map(h => {
    //                 if (h.id === hid) {
    //                     h.isClosed = true;
    //                 }
    //                 return h;
    //             });
    //             this.setState(state);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
    //
    // handleFinalize(hid) {
    //     const state = this.state;
    //     const url = '/hackathon/finalize';
    //     axios.post(url, {
    //         hid: hid,
    //     })
    //         .then(res => {
    //             if (res.status === 200) {
    //                 state.hackathons = state.hackathons.map(h => {
    //                     if (h.id === hid) {
    //                         h.isFinalized = true;
    //                     }
    //                     return h;
    //                 });
    //                 this.setState(state);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // leaveButton() {
    //     if (this.state.organization.name != null) {
    //         return <Button type="button" variant="danger" onClick={this.handleLeave}>Leave</Button>
    //     }
    // }

    // createOrgButton() {
    //     const role = localStorage.getItem('role');
    //     if (role === 'hackerUser') {
    //         // return <a href='/createOrg'>CREATE ORGANIZATION</a>
    //         return <Button href={'/createOrg'}>CREATE</Button>
    //     }
    //
    // }
    //
    // hackathonListButton() {
    //     return <a href='/hackathons'>Show hackations</a>
    // }


    // handleOpen(hid) {
    //     axios.post('/hackathon/open', {
    //         hid: hid,
    //         date: this.today(),
    //     })
    //         .then(res => {
    //             alert("Now open for submission");
    //         })
    //         .catch(err => {console.log(err)});
    // }


    // today() {
    //     const today = new Date();
    //     let dd = today.getDate();
    //     let mm = today.getMonth() + 1; //January is 0!
    //     let yyyy = today.getFullYear();
    //
    //     if (dd < 10) {
    //         dd = '0' + dd
    //     }
    //
    //     if (mm < 10) {
    //         mm = '0' + mm
    //     }
    //     return yyyy + '-' + mm + '-' + dd;
    // }

    changeOrg(org) {
        this.setState({organization: org})
    }

    showList() {
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
            console.log('state', this.state.organization);
            return (
                <Accordion defaultActiveKey="0">
                    <Organization organization={this.state.organization} change={this.changeOrg.bind(this)}/>
                    <HackerHackathonList email={this.state.user.email}/>
                </Accordion>
               

            );
        }

        // console.log(this.state);
        if (role === 'AdminUser') {
            return (
                <AdminHackathonList/>
            );
        }
    }

    render() {
        if (this.state.error) {
            return (
                <div><a href="/login">Please Login</a></div>
            );
        } else {
            const user = this.state.user;
            // console.log(user);
            const addr = user.Address;
            let address;
            if (addr != null) {
                var street = addr.street == null ? "" : (addr.street);
                var city = addr.city == null ? "" : (addr.city);
                var state = addr.state == null ? "" : (addr.state);
                var zip = addr.zip == null ? "" : (addr.zip);
                address = street + ", "+ city+ ", "+ state+", "+ zip;
            }
            var portrait = this.state.user.portrait;
            if(portrait == null){
                portrait = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdddVm4g4gaYFb56WgKroI5kJ-H4ONMEvFbQqrd49FkGf7rrZSSA';
            }

            return (
                <div>
                    <Header/>
                    <div className="UserProfile">
                        {/*<h1> welcome {user.ScreenName}</h1>*/}
                        <Row>
                            <Col sm={3}>
                                <div className={"user-info"}>
                                    <div className={"user-img"}>
                                        <img src= {portrait}/>
                                    </div>
                                    <div>
                                        <div>Screen Name: {user.ScreenName}</div>
                                        <div>Name: {user.name}</div>
                                        <div>Email: {user.email}</div>
                                        <div>BusinessTitle: {user.BusinessTitle}</div>
                                        <div>Description: {user.Description}</div>
                                        <div>Address :{address}</div>
                                    </div>
                                    <Button style={{width: "100%"}} variant="secondary" size="sm" href='/edit_user'>Edit</Button>
                                </div>
                            </Col>

                            <Col sm={9}>
                                {this.showList()}
                                {/*<div>{this.hackathonListButton()}</div>*/}
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }

}


export default UserProfile;