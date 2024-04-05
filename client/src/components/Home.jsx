import React, { useContext,useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMediaQuery } from "@mui/material";
import TopTalents from './TopTalents';
import { Toaster, toast } from "react-hot-toast";
import { ContextAPI } from '../context/Provider';
export default function Home() {
    const isMobileOrMd = useMediaQuery("(max-width: 768px)");
    const { authLogin } = useContext(ContextAPI);
     const [authData, setAuthData] = useState({
       id_card: "",
       password: "",
     });

     const handleChange=(e)=>setAuthData({
      ...authData,
      [e.target.name]: e.target.value
     })
     const handleSubmit =(e)=>{
      e.preventDefault();
      authLogin(authData,(err,response)=>{
          if(err){
            toast.error(response);
            return
          }
          toast.success(response);
          setAuthData({
            id_card: "",
            password: ""
          })
      })

     }
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Toaster position="top-center" reverseOrder={false} />
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
                <Form.Control
                  value={authData.id_card}
                  name="id_card"
                  onChange={handleChange}
                  type="text"
                  placeholder="your id_number, e,g: C120000"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={authData.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="your pass"
                />
              </Form.Group>
              <Button onClick={handleSubmit} variant="secondary">
                Sign In
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <TopTalents />
    </Container>
  );
}
