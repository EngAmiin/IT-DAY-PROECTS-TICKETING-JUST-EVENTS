import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Toaster, toast } from "react-hot-toast";
import { ContextAPI } from "../context/Provider";
import Alerts from "../components/Alerts";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Register() {
  var navigate = useNavigate();
  const ref = useRef()
  const [show,setShow]=useState(false);
  const {readSemesters,semesters,checkStudentRange, readActiveEvent,activeEvent, saving,registerStudent, hasError, errorMessage, successMessage } =
    useContext(ContextAPI);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    semester: '',
    id_card: "",
    className :"",
    event: activeEvent?.id,
  });

  useEffect(()=>{
    readActiveEvent(function(){});
    readSemesters(function () {});
    console.log(activeEvent)
  },[])

  const handleChange = (e) =>
    setData({
      ...data,
      event: activeEvent.id,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkStudentRange(activeEvent?.id,(err,res)=>{
      if(err)
      {
        console.log("failed to check student ")
        toast.error(res, {
          duration: 9000,
        });
        return;
      }
      registerStudent(data, async (err, res) => {
        if (err) {
          toast.error(res);
          return;
        }
        toast.success(res);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
    });
    
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
      <Alerts
        show={show}
        variant={hasError ? "danger" : "success"}
        message={
          hasError ? (
            <>
              <strong>{errorMessage}</strong>
            </>
          ) : (
            <>
              <strong>{successMessage}</strong>
            </>
          )
        }
      />

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
                name="semester"
                value={data.semester}
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option value="">Select Semester</option>
                {semesters &&
                  semesters.map((semester) => {
                    return <option value={semester.id}>{semester.name}</option>;
                  })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Class</Form.Label>
              <Form.Control
                name="className"
                value={data.className}
                onChange={handleChange}
                className="border"
                type="text"
              ></Form.Control>
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
          <Col lg={12} sm={12} md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Active Event</Form.Label>
              <Form.Select
                disabled
                defaultValue={activeEvent && activeEvent.id}
                name="event"
                aria-label="Default select example"
              >
                {Object.keys(activeEvent).length > 0 ? (
                  <option value={activeEvent && activeEvent.id}>
                    {activeEvent && activeEvent.event}
                  </option>
                ) : (
                  <option value="">
                    There is No Active Events, To Submit Ths Project
                  </option>
                )}
              </Form.Select>
              <strong className="text-danger fs-6">
                ** Only You Can Join Active Events{" "}
                {activeEvent && activeEvent.event}
              </strong>
            </Form.Group>
          </Col>
          {/* <Col lg={12} md={12} sm={12} xs={12} className="mb-2">
            <Form.Group className="mb-2">
              <Form.Label>Profile (Optional)</Form.Label>
              <Form.Control className="border" type="file"></Form.Control>
            </Form.Group>
          </Col> */}
        </Row>

        <Button onClick={handleSubmit} variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
