import React from 'react'
import Alert from "react-bootstrap/Alert";

export default function Alerts({variant,message,show}) {
  return (
    <Alert  show={show} variant={variant}>
      {message}
    </Alert>
  );
}
