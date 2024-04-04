import React from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
export default function Register() {
  return (
    <Container
      className="box-shadow"
      style={{
        background: "white",
        "border-radius": "10px",
        padding: "20px",
        marginTop: "2rem",
      }}
    >
      <h4 className="text-muted mb-4">Register Your Account</h4>
      <Form>
        <Row className="mb-3">
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>FullName</Form.Label>
              <Form.Control
                className="border"
                type="text"
                placeholder="Enter Your fullname"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control
                className="border"
             
                type="text"
                placeholder="Enter Your Id Card Number"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                className="border"
                type="number"
                placeholder="Enter Your Mobile Number"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Semester</Form.Label>
              <Form.Select
                className="border"
                aria-label="Default select example"
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3" selected>
                  Three
                </option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control className="border" type="password"></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Profile (Optional)</Form.Label>
              <Form.Control className="border" type="file"></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
