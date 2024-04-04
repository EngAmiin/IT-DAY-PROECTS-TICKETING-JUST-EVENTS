import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Banner() {
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Row>
        <Col xl={7} md={12}>
          <div className="">
            <h2 className="poppins-light">Empowering Innovation</h2>
            <p className='poppins-thin' style={{lineHeight: 1.8,textAlign: "justify"}}>
              Annual event that brings together technology enthusiasts,
              innovators to showcase and celebrate groundbreaking projects and
              advancements in the field of information technology. With a focus
              on fostering collaboration and driving innovation, IT-DAY-PROJECT
              serves as a platform for Students to Register their Project.
            </p>
            <Button className='my-sm-3 my-xs-2 my-lg-1 my-md-1' variant="outline-secondary">Top Talented 📢</Button>
          </div>
        </Col>
        <Col xl={5} md={12}>
          <Card
            className="box-shadow"
            style={{ width: "100%", border: "none", borderRadius: "10px" }}
          >
            <Card.Body>
              <Card.Title>LOGIN YOUR ACCOUNT</Card.Title>
              <hr />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="your pass" />
              </Form.Group>
              <Button variant="secondary">Sign In</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
