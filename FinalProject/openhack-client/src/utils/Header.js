import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: "",
        };
    }

    render() {
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
                        <Navbar.Text>
                            <a href="/login">Login</a>
                        </Navbar.Text>
                        <Navbar.Text style={{marginLeft: "20px"}}>
                            <a href="/signup">Sign up</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;