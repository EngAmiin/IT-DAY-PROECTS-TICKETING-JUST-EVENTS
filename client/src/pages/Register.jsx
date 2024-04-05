import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Toaster, toast } from "react-hot-toast";
import { ContextAPI } from "../context/Provider";
import Alerts from "../components/Alerts";
import { useNavigate } from "react-router";
export default function Register() {
  var navigate = useNavigate();
  const { registerStudent, hasError, errorMessage, successMessage } =
    useContext(ContextAPI);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    semester: 1,
    id_card: "",
  });

  const handleChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerStudent(data);
    console.log(res);
  
  };

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
      {hasError ? (
        <Alerts
          show={true}
          variant={"danger"}
          message={<strong>{errorMessage}</strong>}
        />
      ) : (
        <Alerts
          show={true}
          variant={"success"}
          message={<strong>{successMessage}</strong>}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <h4 className="text-muted mb-4">Register Your Account</h4>
      <Form>
        <Row className="mb-3">
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>FullName</Form.Label>
              <Form.Control
                className="border"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Your fullname"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control
                name="id_card"
                value={data.id_card}
                onChange={handleChange}
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
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
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
              <Form.Control
                name="password"
                value={data.password}
                onChange={handleChange}
                className="border"
                type="password"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Profile (Optional)</Form.Label>
              <Form.Control className="border" type="file"></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button onClick={handleSubmit} variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
