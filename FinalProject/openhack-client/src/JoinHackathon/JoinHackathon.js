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
            inviteEmail:""
        };
        this.handleInviteChange = this.handleInviteChange.bind(this);
        this.handleInvite = this.handleInvite.bind(this);
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
                alert(err);
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
        // console.log(payload);
        axios.post('/hackathon/team', payload)
            .then(res => {
                const data = res.data;
                // console.log(data);
                this.joinHack(data.id);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    joinHack(tid) {
        axios.post('/hackathon/join', {
            uid: this.state.uid,
            tid: tid,
            hid: this.state.hid,
        })
            .then(res => {
                alert('Team Joined Hackathon');
                // console.log(res);
                // this.props.history.push('/hackathonEvent/' + this.state.hid);
            })
            .catch(err => {
                alert(err.response.data);
                console.log(err);
            });
    }

    inputGroup() {
        const min = this.state.hackathon.minSize;
        const max = this.state.hackathon.maxSize;
        const inputs = [];
        let require = true;
        for (let i = 0; i < max - 1; i++) {
            if (i >= min - 1) {
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

    handleInviteChange(e){
console.log("e ",e);

        this.setState({inviteEmail: e.target.value});
    }

    
    handleInvite(e) {
        e.preventDefault();
        
        alert("Invite sent");
        const payload = {
            
            uid: this.state.uid,
            email: this.state.inviteEmail
        };
        console.log("e ",e,"payload ",payload);
        axios.post('/invite', payload)
            .then(res => {
                alert("invite successful. Please check email to activate");
                this.setState({inviteEmail:""});
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Header/>
                
                
                <div>
                    <Form>
                        {/*<h2>Invite external user here</h2>*/}
                        <form class="form-inline" onSubmit={this.handleInvite.bind(this)}>
                          {<div class="form-group mb-2">
                            <label for="staticEmail2" class="sr-only">Email</label>
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Invite external user here" />
                          </div>}
                          <div class="form-group mx-sm-3 mb-2 ">
                            
                            <input type="text" class="form-control" value={this.state.inviteEmail} placeholder="Email Address" onChange={this.handleInviteChange}/>
                          </div>
                          <button type="submit" class="btn btn-primary mb-2">Invite</button>
                        </form>
                        
                    </Form>
                </div>

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
                        <Button type={"submit"}>Join Hackathon</Button>
                    </Form>
                </div>
            </div>
        )

    }
}

export default JoinHackathon;