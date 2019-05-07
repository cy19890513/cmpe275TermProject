import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: undefined,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('username') !== undefined) {
            this.setState({loginName: localStorage.getItem('username')});
        }
    }

    render() {
        let userSession;
        console.log(localStorage.getItem('username'));
        if (this.state.loginName !== undefined) {
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
                        <a href="/logout">Log out</a>
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
                            <Nav.Link href="/hackathon">Hackathon</Nav.Link>
                        </Nav>
                        {userSession}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;