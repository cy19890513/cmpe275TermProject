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
            hackers: [],
            teamName: "",
            url: "",
        }
    }

    componentDidMount() {
        const {match : { params }} = this.props;
        axios.get('/hackathon/teamInfo', {
            params: {
                uid: this.state.uid,
            }
        })
            .then( res => {
                const teamInfo = res.data;
                const members = teamInfo.members.map(member => {
                    return {name: member.name, email: member.email};
                });
                this.setState( () => {return {hackers: members, teamName: teamInfo.teamName}});
            })
            .catch(err => {
                console.error(err);
            });
    }

    createTable() {
        return this.state.hackers.map(hacker => {
            return (
                <tr>
                    <td>{hacker.name}</td>
                    <td>{hacker.email}</td>
                </tr>
            )
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // axios.post
    }

    handleChange(e) {
        this.setState(() => {
            return {url: e.target.value};
        });
    }

    render() {
        return (
            <div>
                <Header/>

                <div className={"container"} >
                    <h3>
                        Team: {this.state.teamName}
                    </h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Team Member</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.createTable()}
                        </tbody>
                    </Table>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Submission</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={"url"}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder={"URL"}
                                onChange={this.handleChange}
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