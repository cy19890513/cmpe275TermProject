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
  
  export default class Signup extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        newUser: null
      };
    }
  
    validateForm() {
      return true;
      // return (
      //   this.state.email.length > 0 &&
      //   this.state.password.length > 0 &&
      //   this.state.password === this.state.confirmPassword
      // );
    }
  
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = async event => {
      event.preventDefault();
  
      this.setState({ isLoading: true });
      userService.register(this.state.email, this.state.password);
  
      this.setState({ newUser: "test" });
  
      this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
      event.preventDefault();
  
      this.setState({ isLoading: true });
    }
  
    // renderConfirmationForm() {
    //   return (
    //     <form onSubmit={this.handleConfirmationSubmit}>
    //       <FormGroup controlId="confirmationCode" bsSize="large">
    //         <FormLabel>Confirmation Code</FormLabel>
    //         <FormControl
    //           autoFocus
    //           type="tel"
    //           value={this.state.confirmationCode}
    //           onChange={this.handleChange}
    //         />
    //         <FormText>Please check your email for the code.</FormText>
    //       </FormGroup>
    //       <LoaderButton
    //         block
    //         bsSize="large"
    //         disabled={!this.validateConfirmationForm()}
    //         type="submit"
    //         isLoading={this.state.isLoading}
    //         text="Verify"
    //         loadingText="Verifying…"
    //       />
    //     </form>
    //   );
    // }

    renderForm() {
      return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
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
          <FormGroup controlId="confirmPassword" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
        //    isLoading={this.state.isLoading}
        //    text="Signup"
        //    loadingText="Signing up…"
        >
        Sign Up
      </Button>
        </form>
      );
    }
  
    render() {
      return (
        <div className="Signup">
         {//this.state.newUser === null
             this.renderForm()
         //   : this.renderConfirmationForm()
         }
        </div>
      );
    }
  }
  