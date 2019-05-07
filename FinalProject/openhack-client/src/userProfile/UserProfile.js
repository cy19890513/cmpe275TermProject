import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormlLabel} from "react-bootstrap";
import {userService} from '../_services/user.service';
import Header from '../utils/Header';
import Org from '../utils/Org';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

import './userProfile.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: false,
        };
    }


    componentDidMount() {
        // fetch('/userProfile?id=6', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data =>
        //         this.setState({
        //             user: data,
        //             isLoaded: true
        //         })
        //     )
        //     .catch(error => this.setState({error, isLoaded: false}));
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
    }

    render() {
        if (this.state.error) {
            return (
                <div><a href="/login">Please Login</a></div>
            );
        } else {
            const user = this.state.user;
            return (
                <div>
                    <Header/>
                    <div className="UserProfile">

                        <h1> welcome {user.ScreenName}</h1>
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdddVm4g4gaYFb56WgKroI5kJ-H4ONMEvFbQqrd49FkGf7rrZSSA'/>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                        <li> Name：{user.name}</li>
                        <li> Email: {user.email}</li>
                        <li> BusinessTitle: {user.BusinessTitle}</li>
                        <li> Address: {user.Address}</li>
                        <li> Description: {user.Description}</li>
                        <a href="/updateUser" ri>edit</a>
                        <h2>Joined Org</h2>

                    </div>
                </div>
            );
        }
    }

}


export default UserProfile;