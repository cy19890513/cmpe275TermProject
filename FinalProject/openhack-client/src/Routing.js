import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login';
<<<<<<< HEAD
import UserProfile from './userProfile/userProfile'
||||||| merged common ancestors
=======
import Signup from './register/Signup';
import CreateHackathon from './createHackathon/CreateHackathon';

>>>>>>> 3dd82cb75a9112845a55a57cb854e14a63676be3

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={null} />
          <Route path={'/hackathon'} component={null} />
          <Route path={'/login'} component={Login} />
<<<<<<< HEAD
          <Route path={'/register'} component={null} />
          <Route path={'/userProfile'} component={UserProfile} />
||||||| merged common ancestors
          <Route path={'/register'} component={null} />
=======

          <Route path={'/register'} component={Signup} />

          <Route path={'/create_hackathon'} component={CreateHackathon} />
>>>>>>> 3dd82cb75a9112845a55a57cb854e14a63676be3
      </Switch>
    </Router>
  );
}

export default Routing;
