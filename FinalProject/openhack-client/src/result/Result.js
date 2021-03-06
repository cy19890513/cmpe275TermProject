import React, { Component } from 'react';
import axios from 'axios';

import Header from '../utils/Header';
import PostPage from '../hackathon/img/post-page.jpg';
import Table from 'react-bootstrap/Table';

import './Result.css';
import '../hackathon/css/style.css';
import First from './imgs/best.png';
import Second from './imgs/second.png';
import Third from './imgs/third.png';

class Result extends Component {
    constructor(props) {
        super(props);
        const hid = props.match.params.hid;
        this.state = {
            hid: hid,
            hackathon: {},
            status: "",
            // teams: [{teamName: "sss", members: ["sdfs", 'sda'], score: 100}],
            teams: [],
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
                this.parseStatus(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(process.env.REACT_APP_API_URL + '/hackathon/result', {
            params: {
                hid: this.state.hid,
            }
        })
            .then(res => {
                this.setState({teams: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    parseStatus(hk){
        let status = "Open Registration";
        if(hk.isFinalized){
            status = "Finalized";
        } else if(hk.isClosed){
            status = "Closed";
        }
        this.setState({status: status});
    }

    createTableCell(rows) {
        rows.sort((a, b) => b.grade - a.grade);
        return rows.map((row, index) => {
            let rank = <td>{index + 1}</td>;
            switch (index) {
                case 0: rank = <td><img className={'medal-icon'} src={First} alt={"No.1"}/></td>; break;
                case 1: rank = <td><img className={'medal-icon'} src={Second} alt={"No.2"}/></td>; break;
                case 2: rank = <td><img className={'medal-icon'} src={Third} alt={"No.3"}/></td>; break;
                default:
            }
            return (
                <tr key={index}>
                    {rank}
                    <td>{row.teamName}</td>
                    <td>{row.members.map(m => <span key={m.username} className={"members"}>{m.username}</span>)}</td>
                    <td>{row.grade}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="post-header" className={"page-header"}>
                    <div className={"background-img"} style={{backgroundImage: `url(${PostPage})`}} />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="post-meta">
                                    <a className="post-category cat-2" href="#">{this.state.status}</a>
                                    <span className="post-date">{this.state.hackathon.startDate}</span>
                                </div>
                                <h1>{this.state.hackathon.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"result-table"}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Team Name</th>
                            <th>Members</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.createTableCell(this.state.teams)}
                        </tbody>
                    </Table>
                </div>
                <div className={"credit"}>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
        )
    }
}


export default Result;