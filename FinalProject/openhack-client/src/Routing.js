import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={null} />
          <Route path={'/hackathon'} component={null} />
          <Route path={'/login'} component={null} />
          <Route path={'/register'} component={null} />
      </Switch>
    </Router>
  );
}

export default Routing;
