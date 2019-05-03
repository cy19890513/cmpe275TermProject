import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home/Home';
import LatestEarthquakes from './latest_earthquakes/LatestEarthquakes';
import Dashboard from './dashboard/Dashboard';
import Map from './statistics/Map';
import top_10 from './statistics/Top_10';
import Frequency from './statistics/Frequency';
import News from './news/News';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const routing = (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/statistics/map' component={Map} />
            <Route path='/statistics/top_10' component={top_10} />
            <Route path='/statistics/frequency' component={Frequency} />
            <Route path='/news' component={News} />
            <Route path='/latest_earthquakes' component={LatestEarthquakes} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
