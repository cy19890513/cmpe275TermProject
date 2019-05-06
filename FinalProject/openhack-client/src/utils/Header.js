import React, { Component } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

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
                {/*<Navbar>*/}
                {/*    <Navbar.Brand href="#home">OpenHack</Navbar.Brand>*/}
                {/*    <Navbar.Toggle />*/}
                {/*    <Navbar.Collapse className="justify-content-end">*/}
                {/*        <Nav className="mr-auto">*/}
                {/*            <Nav.Link href="#home">Home</Nav.Link>*/}
                {/*            <Nav.Link href="#link">Hackathon</Nav.Link>*/}
                {/*        </Nav>*/}
                {/*        <Navbar.Text>*/}
                {/*            <a href="#login">this.state.loginName</a>*/}
                {/*        </Navbar.Text>*/}
                {/*    </Navbar.Collapse>*/}
                {/*</Navbar>*/}
            </div>
        )
    }
}

export default Header;