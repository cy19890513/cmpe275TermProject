import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

import Nav from 'react-bootstrap/Nav';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: null,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('username') != undefined) {
            this.setState({loginName: localStorage.getItem('username')});
        }
    }

    handleSignout() {
        const uid = localStorage.getItem("uid");
        axios.post(process.env.REACT_APP_API_URL + '/logout', {
            uid: uid,
        })
            .then(res => {
                // console.log("logout");
            })
            .catch(err => {
                var eMessage = err.response.message? "\n"+err.response.message : "";
                alert(err+eMessage);
                console.error(err);
            });
        localStorage.clear();
        this.setState({loginName: undefined});
    }

    render() {
        let userSession;
        // console.log(localStorage.getItem('username'));
        if (localStorage.getItem('username') == undefined) {
            // console.log(localStorage.getItem('username'));
            userSession = (
                <div>
                    <Navbar.Text>
                        <a href="/login">Login</a>
                    </Navbar.Text>
                    <Navbar.Text style={{"marginLeft": "20px"}}>
                        <a href="/signup">Sign up</a>
                    </Navbar.Text>
                </div>
            );
        } else {
            const profileUrl = "/user/" + this.state.loginName;
            userSession = (
                <div>
                    <Navbar.Text>
                        <a href={profileUrl}>{this.state.loginName}</a>
                    </Navbar.Text>
                    <Navbar.Text style={{marginLeft: "20px"}}>
                        <a href="/" onClick={this.handleSignout}>Log out</a>
                    </Navbar.Text>
                </div>
            );
        }
        return (
            <div>
                <Navbar className={'head'}>
                    <Navbar.Brand href="/">OpenHack</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/hackathons">Hackathons</Nav.Link>
                        </Nav>
                        {userSession}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;