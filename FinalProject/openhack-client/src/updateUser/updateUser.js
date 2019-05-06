import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormlLabel } from "react-bootstrap";
import { userService } from '../_services/user.service';
import Header from '../utils/Header';


class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded:false,
            user:[],
            error: null
        };
    }


  
    
      componentDidMount(){
        fetch('url',{
            method: 'POST',
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
                
                 <div className="UpdateUser">
                     <Header/>
                     <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="well">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#home" data-toggle="tab">Profile</a></li>
           
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane active in" id="home">
              <form id="tab">
                <label>Name</label>
                <input type="text" defaultValue="jsmith" className="input-xlarge" />
                <label>Portrait</label>
                <input type="text" defaultValue="jsmith" className="input-xlarge" />
                <label>Description</label>
                <input type="text" defaultValue="John" className="input-xlarge" />
                <label>BusinessTitle</label>
                <input type="text" defaultValue="Smith" className="input-xlarge" />
                <label>Street</label>
                <input type="text" defaultValue="street" className="input-xlarge" />
                <label>City</label>
                <input type="text" defaultValue="street" className="input-xlarge" />
                <label>State</label>
                <input type="text" defaultValue="street" className="input-xlarge" />
                <label>Zip</label>
                <input type="text" defaultValue="street" className="input-xlarge" />
               
               
                <div>
                  <button className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
                    
                </div>
            );
        }
      }

}


export default UpdateUser;