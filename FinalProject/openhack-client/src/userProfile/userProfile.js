import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormlLabel } from "react-bootstrap";
import { userService } from '../_services/user.service';
<<<<<<< HEAD
import Header from '../utils/Header';
import Org from '../utils/Org';
=======
// import "./css/style.css";
>>>>>>> 2e318309fb9c6fdcb87964019c35ab8401214217


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
        fetch('/userProfile?id=6',{
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
                
                 <div className="UserProfile">
                     <Header/> 
                     <h1> welcome {user.ScreenName}</h1>
                          <img src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdddVm4g4gaYFb56WgKroI5kJ-H4ONMEvFbQqrd49FkGf7rrZSSA'/>
                          <li> Name：{user.name}</li>
                          <li> Email: {user.email}</li>
                          <li> BusinessTitle: {user.BusinessTitle}</li>
                          <li> Address: {user.Address}</li>
                          <li> Description: {user.Description}</li>
                          <a href="/updateUser" ri>edit</a>
                     <h2>Joined Org</h2>
                     
                </div>
                     
                          
             
                
                
            );
        }
      }

}


export default UserProfile;