import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './PTeamList.css';

class PTeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            eventId: 1,
            pdata:[]
        }
    }
    
    componentDidMount() {
        
        // var url = process.env.REACT_APP_API_URL + `/hackathon/paymentStatus?hid=${this.state.eventId}`;
        // axios.get(url)
        //     .then(res => {

        //         const pdata = res.data;
        //         this.setState({ pdata });

        //     })
        //     .catch(err => {
        //         alert(err);
        //         console.error("line 45 err");
        //     })
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const pdata = this.props.pdata;
            const hid = this.props.hid;
            // const t = teams.map(team => {
            //     team.isSubmitted = false;
            //     return team;
            // });
            this.setState({eventId:hid,pdata: pdata});
        }
    }



    buildTable(){
        console.log("pdata ",this.state.pdata);
        return(
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Paid Amount</th>
                  <th scope="col">ifAllPaid</th>
                  <th scope="col">Paid time</th>
                </tr>
              </thead>
              
                {

                    this.parseTeams(this.state.pdata.allTeams)
                }
              
            </table>
              );
    }
    
    parseTeams(allTeams){
console.log("allTeams ",allTeams);        
        if(allTeams == null){
            return
        }

        return allTeams.map((team,index)=>{
                    return(
                        <tbody>
                        <tr>
                            <th scope="row">{index+1}</th>
                            <th >{team.teamName}</th>
                            <th ></th>
                            <th class={team.ifAllPaid ?"text-success":"text-warning"}>
                             {team.ifAllPaid ?"Yes":"No"}</th>
                            <th ></th>
                        </tr>
                        {
                            this.parseMembers(team.members)
                        }
                        </tbody>
                    );
                    
                  });

    }
 
    parseMembers(members){
console.log("members ",members);        
        if(members == null){  return  }
        return members.map( member =>{
                return(
                    <tr>
                        <th scope="row"></th>
                        <th >{member.memberName}</th>
                        <th >{member.amount}</th>
                        
                        <th >{member.paid?"Yes":"No"}</th>
                        <th >{member.paidTime}</th>
                    </tr>
                );
        
        });
    }

    createList() {
        const teams = this.state.teams;
        return teams.map(team => {
            return (
                <li key={team.id}>
                    <Row>
                        <Col sm={"8"}>
                            <Card.Title>{team.teamName}</Card.Title>
                            <Card.Text>Submission: <a href={team.url}>{team.url}</a></Card.Text>
                        </Col>
                        <Col sm={"4"}>
                            <div className={"float-right"}>
                                <Form onSubmit={this.handleSubmit.bind(this, team.id)}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="0.0"
                                            aria-label="Grade"
                                            type={"number"}
                                            // value={this.state.teamGrade[team.id]}
                                            onChange={this.handleChange.bind(this, team.id)}
                                            required
                                        />
                                        <InputGroup.Append>
                                            <Button type={"submit"} variant="outline-secondary">Grade</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                                <div style={{display: PTeamList.showSubmit(team)}} className={"notify"}>Grade submitted
                                    for team {team.teamName}</div>
                            </div>
                        </Col>
                    </Row>
                </li>
            );
        });
    }

    createTable(){
        

    }




    render() {

        return (
            <div>
                {this.buildTable()}
             
            

            
            </div>
        )
    }
}

export default PTeamList;