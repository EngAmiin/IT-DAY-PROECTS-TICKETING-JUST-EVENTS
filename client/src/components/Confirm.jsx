import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function Confirm({show,handleClose,handleConfirm,message,title}) {
  return (
    <Modal
      size="md"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {title ? title : "Confirm"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
        <div className='mt-3'>
          <Button variant="danger" onClick={handleConfirm}>
            Continue
          </Button>
          <Button variant="outline-success mx-2" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
