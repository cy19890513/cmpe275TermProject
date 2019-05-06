import React, { Component } from 'react';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import RaisedButton from 'material-ui/RaisedButton';
import {
    FormText,
    HelpBlock,
    Button,
    FormGroup,
    FormControl,
    FormLabel
  } from "react-bootstrap";
import "./Signup.css";
import { userService } from '../_services/user.service';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    this.props.history.push('/');
    if (this.state.password === this.state.confirmPassword) {
      userService.register(this.state.email, this.state.password, this.state.username);
    } else {
      alert("Password not match");
    }
  };

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
                autoFocus
                type="email"
                onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>User name</FormLabel>
            <FormControl
                autoFocus
                type="text"
                onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
                onChange={this.handleChange}
                type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
                onChange={this.handleChange}
                type="password"
            />
          </FormGroup>
          <Button
              block
              bsSize="large"
              type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default Signup;