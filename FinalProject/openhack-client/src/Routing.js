import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login/Login';
import CreateHackathon from './createHackathon/CreateHackathon';
import Submission from './submission/Submission';

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={null} />
          <Route path={'/hackathon'} component={null} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={null} />
          <Route path={'/create_hackathon'} component={CreateHackathon} />
          <Route path={'/submit/:uid'} component={Submission} />
      </Switch>
    </Router>
  );
}

export default Routing;
