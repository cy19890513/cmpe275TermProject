import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { userService } from '../_services/user.service';
import "./Login.css";

class Login extends Component {
    constructor(props){
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
        console.log("pressed button");
        userService.login(this.state.email, this.state.password);
        var s = localStorage.getItem("sessionId");
        console.log(s);
        this.props.history.push("/");
      }

      render() {
        return (
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <FormLabel>email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
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
        );
      }

}

export default Login;