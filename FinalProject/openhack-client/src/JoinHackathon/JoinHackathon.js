import React, {Component} from 'react';

import Header from '../utils/Header';
import Form from "react-bootstrap/es/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "reactstrap/es/Button";

class JoinHackathon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hid: null,
            uid: null,
            teamName: null,
            members: [],
            teamLead: "",
            hackathon: {},
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const hid = params.hid;
        const uid = localStorage.getItem("uid");
        const teamLead = localStorage.getItem('username');

        axios.get('/hackathon/search', {
            params: {
                hid: hid,
            }
        })
            .then(res => {
                const h = res.data;
                const max = h.maxSize;
                const memberHolder = [];
                for (let i = 0; i < max; i++) {
                    memberHolder.push({email: "", role: ""});
                }
                this.setState({hackathon: h, members: memberHolder});
            })
            .catch(err => {
                console.log(err)
            });
        this.setState({hid: hid, uid: uid, teamLead: teamLead});
    }

    handleEmail(i, e) {
        const email = e.target.value;
        const members = this.state.members;
        members[i].email = email;
        this.setState({members: members});
    }

    handleRole(i, e) {
        const role = e.target.value;
        const members = this.state.members;
        members[i].role = role;
        this.setState({members: members});
    }

    handleTeamName(e) {
        const name = e.target.value;
        this.setState({teamName: name});
    }

    handleSubmit(e) {
        e.preventDefault();
        const members = this.state.members.filter(mem => {
            if (mem.email === "" || mem.role === "") {
                return false;
            }
            return true;
        });

        const payload = {
            hid: this.state.hid,
            uid: this.state.uid,
            teamName: this.state.teamName,
            members: members,
        };
        console.log(payload);
        axios.post('/hackathon/team', payload)
            .then(res => {
                alert('Team created');
                this.props.history.push('/hackathonEvent/' + this.state.hid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    inputGroup() {
        const min = this.state.hackathon.minSize;
        const max = this.state.hackathon.maxSize;
        const inputs = [];
        let require = true;
        for (let i = 0; i < max; i++) {
            if (i >= min) {
                require = false;
            }
            inputs.push(
                <li key={i}>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Member</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type={"email"} placeholder={"email"} required={require}
                                     onChange={this.handleEmail.bind(this, i)}/>
                        <FormControl type={"text"} placeholder={"role"} required={require}
                                     onChange={this.handleRole.bind(this, i)}/>
                    </InputGroup>
                </li>
            )
        }
        return inputs;
    }


    render() {
        return (
            <div>
                <Header/>

                <div>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <h2>Form your team</h2>

                        <ol>
                            <li>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Team Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type={"text"}
                                                 placeholder={"team name"}
                                                 required={true}
                                                 onChange={this.handleTeamName.bind(this)}/>
                                </InputGroup>
                            </li>
                            <li>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Team Lead</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl value={this.state.teamLead} disabled={true}/>
                                    <FormControl value={"Team Lead"} disabled={true}/>
                                </InputGroup>
                            </li>
                            {this.inputGroup()}
                        </ol>
                        <Button type={"submit"}>Submit</Button>
                    </Form>
                </div>
            </div>
        )

    }
}

export default JoinHackathon;