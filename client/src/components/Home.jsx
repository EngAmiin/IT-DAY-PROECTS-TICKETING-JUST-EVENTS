import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useMediaQuery } from "@mui/material";
import TopTalents from "./TopTalents";
import ListGroup from "react-bootstrap/ListGroup";
import { ContextAPI } from "../context/Provider";
import Report from "./Report";
import FAQ from "./faq";
import DarkModeToggle from "./DarkMode";

export default function Home() {
  const isMobileOrMd = useMediaQuery("(max-width: 768px)");
  const { getCurrentUser, user } = useContext(ContextAPI);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Container style={{ marginTop: "4rem" }}>
      <DarkModeToggle/>
      <Row>
        <Col xl={7} md={12}>
          <div className="">
            <h2 className="poppins-light">Empowering Innovation</h2>
            <p
              className="poppins-thin"
              style={{ lineHeight: 1.8, textAlign: "justify" }}
            >
              Annual event that brings together technology enthusiasts,
              innovators to showcase and celebrate groundbreaking projects and
              advancements in the field of information technology. With a focus
              on fostering collaboration and driving innovation, IT-DAY-PROJECT
              serves as a platform for Students to Register their Project.
            </p>
            <Button
              className={isMobileOrMd ? "mb-4" : ""}
              variant="outline-secondary"
            >
              Top Talented 📢
            </Button>
          </div>
        </Col>
        <Col xl={5} md={12}>
          <Card className="box-shadow">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  IT-DAY Event provides an opportunity for students to receive
                  recognition for their hard work and achievements
                </ListGroup.Item>
                <ListGroup.Item>
                  IT-DAY allows students to receive valuable feedback from a
                  knowledgeable audience
                </ListGroup.Item>
                <ListGroup.Item>
                  Presenting projects at IT-DAY helps students develop essential
                  presentation and communication skills
                </ListGroup.Item>

                <ListGroup.Item>Join Annual IT-DAY EVENT @JUST</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Report />
      <FAQ />
      <TopTalents />

     
    </Container>
  );
}
