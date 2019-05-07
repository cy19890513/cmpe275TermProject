import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/Login';
import Signup from './register/Signup';
import UpdateUser from './updateUser/updateUser'
import CreateHackathon from './createHackathon/CreateHackathon';
import Submission from './submission/Submission';
import HackathonList from './hackathon/HackathonList';
import HackathonEvent from "./hackathon/HackathonEvent";
import UserProfile from "./userProfile/userProfile";
import CreateOrg from "./createOrg/createOrg";
import Home from './Home/Home';

function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/hackathons'} component={HackathonList}/>
                <Route path={'/hackathonEvent'} component={HackathonEvent}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/updateUser'} component={UpdateUser}/>
                <Route path={'/register'} component={Signup}/>
                <Route path={'/signup'} component={Signup}/>
                <Route path={'/userprofile'} component={UserProfile}/>
                <Route path={'/create_hackathon'} component={CreateHackathon}/>
                <Route path={'/createOrg'} component={CreateOrg}/>
                <Route path={'/submit/:uid'} component={Submission}/>
                <Route path={'/user/:uid'} component={null} />
            </Switch>
        </Router>
    );
}

export default Routing;
