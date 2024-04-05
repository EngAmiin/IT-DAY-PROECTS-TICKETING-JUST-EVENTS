
import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Row,Col} from "react-bootstrap";

export default function AddProjectModal({show,handleClose}) {
 
  return (
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g: bank manageemnt system"
              />
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={12} sm={12} md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Active Event</Form.Label>
              <Form.Control type="text" disabled placeholder="Auto Load" />
            </Form.Group>
          </Col>
          <Col lg={12} sm={12} md={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Technologies</Form.Label>
              <Form.Control
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
        <Button variant="outline-secondary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
