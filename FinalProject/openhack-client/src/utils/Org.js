import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button , ListGroup, ListGroupItem} from 'reactstrap';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

class Org extends Component {

   

    render() {
        return (
            <div className = "Org">
             <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>name：</Card.Title>
                    <Card.Text>
                            description：
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem></ListGroupItem>
                    <ListGroupItem> Owner</ListGroupItem>
                    <ListGroupItem>Address</ListGroupItem>
                </ListGroup>
                <Card.Body>
                     <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
             </Card>
                
            </div>
        );
    }
}

export default Org;