import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { ContextAPI } from "../context/Provider";
import { Toaster, toast } from "react-hot-toast";

export default function AddProjectModal({ show, handleClose }) {
  const { registerProject, user, getCurrentUser, readProjects } =
    useContext(ContextAPI);
    useEffect(()=>{
      getCurrentUser();
    },[])

  const [projectData, setProjectData] = useState({
    studentId: user.length > 0 ? user[0].id : "",
    project: "",
    type: "",
    event: 1,
    tech: "",
    description: "",
  });

  const onChangeValues = (e) =>
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    registerProject(projectData, (err, res) => {
      if (err) {
        toast.error(res);
        return;
      }

      toast.success(res);
      readProjects(
        JSON.parse(localStorage.getItem("user"))[0].id,
        function () {}
      );
      handleClose();
      setProjectData({
        project: "",
        type: "",
        event: 1,
        tech: "",
        description: "",
      });
    });
    console.log(projectData);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6} sm={12} md={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  name="project"
                  value={projectData.project}
                  onChange={onChangeValues}
                  type="text"
                  placeholder="e.g: bank manageemnt system"
                />
              </Form.Group>
            </Col>
            <Col lg={6} sm={12} md={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Type</Form.Label>
                <Form.Select
                  defaultValue={"1"}
                  name="type"
                  value={projectData.type}
                  onChange={onChangeValues}
                  aria-label="Default select example"
                >
                  <option value="1">web</option>
                  <option value="2">mobile</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={12} sm={12} md={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Active Event</Form.Label>
                <Form.Control
                  name="event"
                  value={projectData.event}
                  onChange={onChangeValues}
                  type="text"
                  disabled
                  placeholder="Auto Load"
                />
              </Form.Group>
            </Col>
            <Col lg={12} sm={12} md={12}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Technologies</Form.Label>
                <Form.Control
                  name="tech"
                  value={projectData.tech}
                  onChange={onChangeValues}
                  as="textarea"
                  placeholder="use comma (,) to register multiple tech"
                  rows={3}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description (Optional)</Form.Label>
                <Form.Control
                  name="description"
                  value={projectData.description}
                  onChange={onChangeValues}
                  as="textarea"
                  placeholder="describe more formal"
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
