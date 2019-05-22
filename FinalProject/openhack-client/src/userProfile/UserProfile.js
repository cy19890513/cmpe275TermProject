import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
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
        const uid = localStorage.getItem('uid');

        this.setState({role: localStorage.getItem('role')});
        axios.get(process.env.REACT_APP_API_URL + '/userProfile', {
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

    }

    changeOrg(org) {
        this.setState({organization: org})
    }

    showList() {
        const role = localStorage.getItem('role');
        if (role === 'hackerUser') {
            return (
                <div>
                    <Organization organization={this.state.organization} change={this.changeOrg.bind(this)}/>
                    <HackerHackathonList email={this.state.user.email}/>

                </div>

            );
        }

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
                        <Row>
                            <Col sm={3}>
                                <div className={"user-info"}>
                                    <div className={"user-img"}>
                                        <img src= {portrait}/>
                                    </div>
                                    <div>
                                        <div>Screen Name: {user.Screenname}</div>
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
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }

}


export default UserProfile;