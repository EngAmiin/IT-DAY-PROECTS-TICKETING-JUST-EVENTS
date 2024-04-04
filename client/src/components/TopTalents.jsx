import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function TopTalents() {
  return (
    <Container style={{ marginTop: "6rem", marginBottom: "10px" }}>
      <h4 className="my-5 text-center">Most Talented 🔥</h4>
      <Row>
        <Col sm={12} lg={4} md={12}>
          <Card
            className="box-shadow"
            style={{ width: "100%", border: "none", borderRadius: "10px" }}
          >
            <Card.Img
              variant="top"
              style={{ heigh: "100px" }}
              src="../../user2.jpg"
            />
            <Card.Body>
              <h4>Anzal Mohamuud</h4>
              <p>
                Top Talented Best Graphic Design For The Year of 2023, Graded My
                Gradualys
              </p>

              <Button variant="outline-secondary">View Project(s)</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={4} md={12}>
          <Card
            className="box-shadow"
            style={{ width: "100%", border: "none", borderRadius: "10px" }}
          >
            <Card.Img variant="top" src="../../user2.jpg" />
            <Card.Body>
              <h4>Nasra Mohamuud</h4>
              <p>
                Top Talented Best Graphic Design For The Year of 2023, Graded My
                Gradualys
              </p>

              <Button variant="outline-secondary">View Project(s)</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={4} md={12}>
          <Card
            className="box-shadow"
            style={{ width: "100%", border: "none", borderRadius: "10px" }}
          >
            <Card.Img variant="top" src="../../cj.PNG" />
            <Card.Body>
              <h4>ENG CJ</h4>
              <p>
                Top Talented Best Graphic Design For The Year of 2023, Graded My
                Gradualys
              </p>

              <Button variant="outline-secondary">View Project(s)</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
