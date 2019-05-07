import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {userService} from '../_services/user.service';
import "./Login.css";
import axios from "axios";
import Header from '../utils/Header';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    validateForm() {
        // return this.state.email.length > 0 && this.state.password.length > 0;
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const serverUrl = "/login";
        const payload = {
            "email": this.state.email,
            "password": this.state.password
        };
        axios.post(serverUrl, payload).then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log("Login successful");
                    const data = res.data;
                    console.log(data);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('uid', data.uid);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('sessionId', data.sessionId);
                    console.log(localStorage.getItem('username'));
                    this.props.history.push("/");
                } else if (res.status === 204) {
                    console.log("email password do not match");
                    alert("email password do not match");
                } else {
                    console.log("email does not exists");
                    alert("email does not exist");
                }
            }
        ).catch(function (error) {
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder={"example@email.com"}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                placeholder={"password"}
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;