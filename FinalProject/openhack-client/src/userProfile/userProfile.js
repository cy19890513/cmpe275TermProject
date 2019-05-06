import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { userService } from '../_services/user.service';


class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded:false,
            user:[],
            error: null
        };
    }

  
    
      componentDidMount(){
        fetch('http://localhost:8080/userProfile?id=6',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }})
            .then(response => response.json())
            .then(data=>
                this.setState({
                    user:data,
                    isLoaded: true
                })
            )
            .catch(error => this.setState({error, isLoaded: false}));
      }    

      render() {
         var {isLoaded, user} = this.state;
        if(!isLoaded){
            return <div> Loading...</div>;
        }
        else{
            return (
            <div className="userProfile">
                {user.map(user =>(
                    <li key={user.id}>
                        Name :{user.Screenname} | Email:{user.email}}
                    </li>
                ))}
            </div>
            );
        }
      }

}

export default UserProfile;