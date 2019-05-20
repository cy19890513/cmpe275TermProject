import React, {Component} from 'react';
import {Button, Card, Col, Collapse, Form, Row} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import axios from "axios";

import Accordion from 'react-bootstrap/Accordion';

import './organization.css';

class Organization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autoCmplOrgs: [],
            selectedOrg: "",
            open: true,
        }
    }

    componentDidMount() {
        const role = localStorage.getItem('role');
        axios.get('/organizations')
            .then(res => {
                this.setState(() => {
                    return {autoCmplOrgs: res.data};
                });
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const uid = localStorage.getItem("uid");
        const orgs = this.state.autoCmplOrgs;
        const orgId = orgs.find(org => org.name === this.state.selectedOrg[0]).id;
        // console.log('orgs', this.state.autoCmplOrgs);
        axios.post('/joinOrg', {uid: uid, oid: orgId})
            .then(res => {
                this.props.change({name: this.state.selectedOrg + " (Pending)"});
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    organizationNameList() {
        return this.state.autoCmplOrgs.map(org => {
            return org.name;
        });
    }

    handleLeave(e) {
        const uid = localStorage.getItem("uid");

        axios.post('/leaveOrg', {uid: uid})
            .then(res => {
                this.props.change({});
            });
    }


    shouldDisplay() {
        // console.log(this.state.organization);
        if (this.props.organization.name != null) {
            return "block";
        } else {
            return "none";
        }
    }

    render() {
        const {open} = this.state;

        const addr = this.props.organization.Address;
        let address;
        if (addr != null) {
            var street = addr.street == null ? "" : (addr.street);
            var city = addr.city == null ? "" : (addr.city);
            var state = addr.state == null ? "" : (addr.state);
            var zip = addr.zip == null ? "" : (addr.zip);
            address = street + ", "+ city+ ", "+ state+", "+ zip;
        }

        return (
            <Card>
                {/*<Card.Header as="h5">Organization</Card.Header>*/}
                {/*<Accordion>*/}

                {/*<Accordion.Toggle as={Card.Header} eventKey={"0"}>*/}
                <Card.Header onClick={() => this.setState({open: !open})}>Organization</Card.Header>

                {/*</Accordion.Toggle>*/}
                {/*<Accordion.Collapse eventKey="0">*/}
                <Collapse in={this.state.open}>

                    <Card.Body>
                        <div className={"org"} style={{display: this.shouldDisplay()}}>
                            <Row>
                                <Col sm={8}>
                                    <Card.Title>{this.props.organization.name}</Card.Title>
                                    <Card.Text>
                                        {this.props.organization.owner}
                                    </Card.Text>
                                    <Card.Text>
                                        {this.props.organization.Description}
                                    </Card.Text>
                                    <Card.Text>
                                        {address}
                                    </Card.Text>
                                    
                                </Col>
                                <Col sm={4}>
                                    <Button className={'btn-size float-right'} type="button" variant="danger"
                                            onClick={this.handleLeave.bind(this)}>LEAVE</Button>
                                </Col>
                            </Row>
                        </div>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Group as={Row}>
                                <Col sm={4}>
                                    <Typeahead
                                        style={{zIndex: 10}}
                                        bsSize={"default"}
                                        clearButton
                                        labelKey="organization"
                                        id={1}
                                        options={this.organizationNameList()}
                                        placeholder="Choose a organization..."
                                        onChange={e => {
                                            this.setState({selectedOrg: e});
                                        }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Button variant="secondary" type={"submit"}>Request to Join</Button>
                                </Col>
                                <Col sm={4}>
                                    <Button className={'btn-size float-right'} href={'/createOrg'}>CREATE</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Collapse>
                {/*</Accordion.Collapse>*/}
                {/*</Accordion>*/}
            </Card>
        );
    }
}

export default Organization;