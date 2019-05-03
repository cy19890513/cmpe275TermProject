import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FaHome from 'react-icons/lib/fa/home'
import FaNewspaper from 'react-icons/lib/fa/newspaper-o'
import FaTrello from 'react-icons/lib/fa/trello'
import FaMapMarker from 'react-icons/lib/fa/map-marker'
import FaHeart from 'react-icons/lib/fa/heart'
import FaLineChart from 'react-icons/lib/fa/line-chart'
import "../index.css"


class Header extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         home: "Home"
    //     }
    // }

    // handleClick = () => {
    //     this.setState({
    //         home: "New Home"
    //     });
    // }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Earthquake Glance</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="/" onClick={this.handleClick}>{this.state.home}<FaHome className="icon" /></Nav.Link> */}
                            <Nav.Link href="/">Home<FaHome className="icon" /></Nav.Link>
                            <Nav.Link href='/news'>News<FaNewspaper className="icon" /></Nav.Link>
                            <Nav.Link href='/latest_earthquakes'>Latest Earthquakes<FaMapMarker className="icon" /></Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard<FaTrello className="icon" /></Nav.Link>
                            <NavDropdown title="Statistics" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/statistics/map">Earthquake Distribution</NavDropdown.Item>
                                <NavDropdown.Item href="/statistics/top_10">Top10 Earthquakes</NavDropdown.Item>
                                <NavDropdown.Item href="/statistics/frequency">Earthquake Facts</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;