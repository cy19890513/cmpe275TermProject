import React, {Component} from 'react';
import Header from '../utils/Header';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            teamName: "",
            url: "",
            tid: null,
            teamLead: "",
            date: this.today(),
        }
    }

    today() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + '-' + mm + '-' + dd;
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const hid = params.hid;
        const uid = localStorage.getItem('uid');
        axios.get('/hackathon/teamInfo', {
            params: {
                uid: uid,
            }
        })
            .then(res => {
                const teamInfo = res.data;
                console.log(teamInfo);
                teamInfo.forEach(team => {
                    if (hid == team.hid) {
                        console.log(team);
                        this.setState({
                            tid: team.id,
                            teamName: team.teamName,
                            teamLead: team.teamLead,
                            members: team.members
                        })
                    }
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    createTable() {
        return this.state.members.map(hacker => {
            console.log(hacker);
            return (
                <tr>
                    <td>{hacker}</td>
                    {/*<td>{hacker.email}</td>*/}
                    {/*<td>sdfafdan</td>*/}
                </tr>
            )
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/hackathon/submit', {
            tid: this.state.tid,
            date: this.state.date,
            submitUrl: this.state.url,
        })
            .then(res => {
                alert("submitted");
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(e) {
        this.setState(() => {
            return {url: e.value};
        });
    }

    render() {
        return (
            <div>
                <Header/>

                <div className={"container"}>
                    <h3>
                        Team: {this.state.teamName}
                    </h3>
                    <h4>
                        Team Lead: {this.state.teamLead}
                    </h4>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Team Member</th>
                            {/*<th>Email</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </Table>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Submission</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={"url"}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder={"URL"}
                                onChange={this.handleChange.bind(this)}
                            />
                        </InputGroup>
                        <Button type={"submit"}>Submit</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Submission;