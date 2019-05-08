import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import axios from 'axios';

import Header from '../utils/Header';
import './EditHackathon.css';


class EditHackathon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organization: ["1", "2", "3", "4", "5"],
            hackers: [],
            hData: {},
            hid: null,
        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const hid = params.hid;
        this.setState({hid: hid});
        axios.get('/organizations')
            .then(res => {
                const list = res.data;
                // console.log(list);
                this.setState({organization: list});
                this.setState({typeaheadOrg: list.map(org => org.name)});
            })
            .catch(err => {
                console.log(err);
            });
        axios.get("/get_all_users")
            .then(res => {
                console.log(res.data);
                const list = res.data.map(e => {
                    return e.email
                });
                this.setState({hackers: list});
            })
            .catch(err => {
                console.log(err);
            });
        axios.get('/hackathon/search', {
            params: {
                hid: hid,
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({hData: data});
                console.log('hack', data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        axios.post('http://localhost:8080/hackathon', {
            // name: data.name,
            // startDate: data.startDate,
            // endDate: data.endDate,
            description: data.description,
            // fee: data.fee,
            // maxSize: data.maxSize,
            // minSize: data.minSize,
            // discount: data.discount,
            sponsors: data.sponsors,
            judges: data.judges,
        })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        const data = this.state.hData;
        return (
            <div>
                <Header/>
                <h1>Edit the Hackathon</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="eventName">
                        <Form.Label column sm="2">
                            Event Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                disabled
                                value={data.name}
                                type={"text"}
                                placeholder="Hackathon"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"startDate"}>
                        <Form.Label column sm={"2"}>
                            Start Date
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                value={data.startDate}
                                type={"date"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"endDate"}>
                        <Form.Label column sm={"2"}>
                            End Date
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                value={data.endDate}
                                type={"date"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"description"}>
                        <Form.Label column sm={"2"}>
                            Description
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                value={data.description}
                                as={"textarea"}
                                onChange={e => {
                                this.setState({description: e.target.value})}}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"fee"}>
                        <Form.Label column sm={"2"}>
                            Fee
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                value={data.fee}
                                type={"number"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"maxSize"}>
                        <Form.Label column sm={"2"}>
                            Team Max Size
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                value={data.maxSize}
                                type={"number"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"minSize"}>
                        <Form.Label column sm={"2"}>
                            Team Min Size
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                value={data.minSize}
                                type={"number"}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"judge"}>
                        <Form.Label column sm={"2"}>
                            Judges
                        </Form.Label>
                        <Col sm={"10"}>
                            <Typeahead
                                defaultSelected={data.judges}
                                clearButton
                                // defaultSelected={this.state.organization.slice(0, 5)}
                                labelKey="Judge"
                                id={1}
                                multiple
                                options={this.state.hackers}
                                placeholder="Choose a hacker..."
                                onChange={e => {
                                    this.setState({judges: e})
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"sponsors"}>
                        <Form.Label column sm={"2"}>
                            Sponsor
                        </Form.Label>
                        <Col sm={"10"}>
                            <Typeahead
                                defaultSelected={data.sponsors}
                                clearButton
                                // defaultSelected={this.state.organization.slice(0, 5)}
                                labelKey="organization"
                                id={1}
                                multiple
                                options={this.state.organization}
                                placeholder="Choose a organization..."
                                onChange={e => {
                                    this.setState({sponsors: e})
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"discount"}>
                        <Form.Label column sm={"2"}>
                            Discount
                        </Form.Label>
                        <Col sm={"10"}>
                            <Form.Control
                                disabled
                                type={"number"}
                            />
                        </Col>
                    </Form.Group>
                    <Button type="submit">Create Hackathon</Button>
                </Form>
            </div>
        );
    }
}

export default EditHackathon;