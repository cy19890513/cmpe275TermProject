import React, {Component} from 'react';
import Header from '../utils/Header';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './Submission.css';

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            teamName: "",
            url: "",
            tid: null,
            teamLead: "",
            date: Submission.today(),
            hid: null,
            submittedUrl: "",
        }
    }

    static today() {
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
        const hid = parseInt(params.hid);

        this.setState({hid: hid});
        const uid = localStorage.getItem('uid');
        axios.get('/hackathon/teamInfo', {
            params: {
                uid: uid,
            }
        })
            .then(res => {
                const teamInfo = res.data;
                console.log(teamInfo);
                const team = teamInfo.find(t => hid === t.hid);
                this.setState({
                    tid: team.id,
                    teamName: team.teamName,
                    teamLead: team.teamLead,
                    members: team.members,
                    url: team.url,
                    submittedUrl: team.url,
                });
            })
            .catch(err => {
                alert(err);
                console.error(err);
            });
    }

    createTable() {
        return this.state.members.map(hacker => {
            // console.log(hacker);
            return (
                <tr key={hacker.username}>
                    <td>{hacker.username}</td>
                    <td>{hacker.role}</td>
                </tr>
            )
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            tid: this.state.tid,
            date: this.state.date,
            submitUrl: this.state.url,
        };
        console.log(data);
        axios.post('/hackathon/submit', {
            tid: this.state.tid,
            date: this.state.date,
            submitUrl: this.state.url
        })
            .then(res => {
                this.setState({submittedUrl: this.state.url});
                // alert("submitted");
                this.props.history.push('/hackathonEvent/' + this.state.hid);
            })
            .catch(err => {
                // alert("Submitted");
                alert(err.response.data);
                console.log(err.response.data);
                // this.props.history.push('/');
            });
    }

    handleChange(e) {
        this.setState({url: e.target.value});
    }

    render() {
        return (
            <div>
                <Header/>

                <div className={"submit"}>
                    <h3>
                        Team: {this.state.teamName}
                    </h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Team Member</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </Table>
                    <div className={'submitted'}>
                        <h5>Submitted: <a href={this.state.submittedUrl}>{this.state.submittedUrl}</a></h5>
                    </div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Submission</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={"url"}
                                aria-label="url"
                                placeholder={"URL"}
                                onChange={this.handleChange.bind(this)}
                                required
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