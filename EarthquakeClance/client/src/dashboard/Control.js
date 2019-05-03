import React, { Component } from 'react';
import axios from 'axios';

import SelectCountry from './SelectCountry';
import './Control.css';
import DatePickers from './DatePickers';


class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: null,
            begin: null,
            end: null,
            suggestions: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/all_countries")
            .then(res => {
                const countries = res.data;
                const suggestions = countries.map(suggestion => ({
                    value: suggestion._id,
                    label: suggestion._id
                }));
                this.setState({ suggestions: suggestions.sort((a, b) => (a.value > b.value) ? 1 : -1) });
            })
            .catch(err => {
                console.error("err");
            });
        axios.get("http://localhost:3000/api/get_first_date")
            .then(res => {
                const date = res.data;
                this.setState({ begin: date.year });
            })
            .catch(err => {
                console.error("err");
            });
        axios.get("http://localhost:3000/api/get_last_date")
            .then(res => {
                const date = res.data;
                this.setState({ end: date.year });
                // console.log(this.state.end);
            })
            .catch(err => {
                console.error("err");
            });
    }

    handleSelectCountry(option) {
        this.setState({ country: option });
        this.props.selection({
            country: option,
            begin: this.state.begin,
            end: this.state.end
        });
    }

    handleSelectBegin(date) {
        this.setState({ begin: date });
        this.props.selection({
            country: this.state.country,
            begin: date,
            end: this.state.end
        });
    }

    handleSelectEnd(date) {
        this.setState({ end: date });
        this.props.selection({
            country: this.state.country,
            begin: this.state.begin,
            end: date
        });
    }

    render() {
        return (
            <div>
                <div style={{ position: 'relative', height: this.props.height, width: this.props.width }}>
                    <div className={'selection'}>
                        <SelectCountry suggestions={this.state.suggestions} select={this.handleSelectCountry.bind(this)} />
                        <div style={{ paddingLeft: 20 }}>
                            <span>From</span>
                            <DatePickers year={this.state.begin} select={this.handleSelectBegin.bind(this)} />
                            <span>to</span>
                            <DatePickers year={this.state.end} select={this.handleSelectEnd.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Control;