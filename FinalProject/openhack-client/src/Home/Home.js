import React, {Component} from 'react';
import Header from '../utils/Header';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <div className={"background"}>
                <Header/>
                <div className={"home-main"}>
                    Welcome to OpenHack
                </div>
            </div>
        );
    }
}

export default Home;