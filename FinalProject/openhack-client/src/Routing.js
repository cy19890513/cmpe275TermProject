import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login';
import Signup from './register/Signup';
import CreateHackathon from './createHackathon/CreateHackathon';


function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={null} />
          <Route path={'/hackathon'} component={null} />
          <Route path={'/login'} component={Login} />

          <Route path={'/register'} component={Signup} />

          <Route path={'/create_hackathon'} component={CreateHackathon} />
      </Switch>
    </Router>
  );
}

export default Routing;
