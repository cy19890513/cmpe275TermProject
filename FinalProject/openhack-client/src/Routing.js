import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './login/Login';
import Signup from './register/Signup';
import EditUser from './EditUser/EditUser'
import CreateHackathon from './createHackathon/CreateHackathon';
import Submission from './submission/Submission';
import HackathonList from './hackathon/HackathonList';
import HackathonEvent from "./hackathon/HackathonEvent";
import UserProfile from "./userProfile/UserProfile";
import CreateOrg from "./createOrg/createOrg";
import Home from './Home/Home';
import EditHackathon from "./EditHackathon/EditHackathon";
import JoinHackathon from "./JoinHackathon/JoinHackathon";
import Payment from "./payment/payment";
import Evaluation from "./evaluation/Evaluation";
import Result from "./result/Result";

function Routing() {
    var RegistHKEvent = null;
    return (


        <Router>
            <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/hackathons'} component={HackathonList}/>
                <Route path={'/hackathonEvent/:hid'} component={HackathonEvent}/>
                <Route path={'/hackathon/update/:hid'} component={EditHackathon}/>
                {/*TODO Registration Hackathon*/}
                <Route path={'/registhk/:hid'} component={RegistHKEvent}/>
                <Route path={'/hackathon/payment'} component={Payment}/>
                <Route path={'/hackathon/:hid/submit'} component={Submission}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/edit_user'} component={EditUser}/>
                <Route path={'/register'} component={Signup}/>
                <Route path={'/signup'} component={Signup}/>
                <Route path={'/userprofile'} component={UserProfile}/>
                <Route path={'/create_hackathon'} component={CreateHackathon}/>
                <Route path={'/createOrg'} component={CreateOrg}/>
                <Route path={'/user/:uid'} component={UserProfile} />
                <Route path={'/hackathon/:hid/join'} component={JoinHackathon}/>
                <Route path={'/hackathon/eval/:hid'} component={Evaluation}/>
                <Route path={'/hackathon/:hid/result'} component={Result}/>
            </Switch>
        </Router>
    );
}

export default Routing;
