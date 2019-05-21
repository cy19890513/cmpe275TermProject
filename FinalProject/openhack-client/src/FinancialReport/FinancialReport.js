import React, { Component } from 'react';
import Header from '../utils/Header';
import {Col, Row, Table} from 'react-bootstrap';
import './FinancialReport.css';

import axios from 'axios';


class FinancialReport extends Component {
    constructor(props) {
        super(props);
        const hid = props.match.params.hid;
        const uid = localStorage.getItem("uid");
        this.state = {
            uid: uid,
            hackathon: {},
            report: {},
            hid: hid,
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + '/hackathon/search', {
            params: {
                hid: this.state.hid,
            }
        })
            .then(res => {
                this.setState({hackathon: res.data});
            })
            .catch(err => console.log(err));

        axios.get(process.env.REACT_APP_API_URL + '/hackathon/earning', {
            params: {
                uid: this.state.uid,
                hid: this.state.hid,
            }
        })
            .then(res => {
                this.setState({report: res.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        const hackathon = this.state.hackathon;
        const report = this.state.report;
        return (
            <div>
                <Header/>

                <div className={"content"}>
                    <Row>
                        <Col sm={"3"} className={"h-info"}>
                            <h3>{hackathon.name}</h3>
                            <div className={"h-date"}>{hackathon.startDate} to {hackathon.endDate}</div>
                            <div className={"h-desc"}>{hackathon.description}</div>
                        </Col>

                        <Col sm={"9"}>
                            <h3>Financial Report</h3>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>US Dollar</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Revenue</td>
                                    <td>${report.revenue}</td>
                                </tr>
                                <tr>
                                    <td>Unpaid</td>
                                    <td>${report.unpaid}</td>
                                </tr>
                                <tr>
                                    <td>Sponsors fee</td>
                                    <td>${report.sponsorsfee}</td>
                                </tr>
                                <tr>
                                    <td>Expenses</td>
                                    <td>${report.expenses}</td>
                                </tr>
                                <tr>
                                    <td>Profit</td>
                                    <td>${report.Profit}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default FinancialReport;