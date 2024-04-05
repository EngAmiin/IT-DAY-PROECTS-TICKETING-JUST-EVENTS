import React,{useContext,useEffect,useState} from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Toaster, toast } from "react-hot-toast";
import { ContextAPI } from "../context/Provider";
import {useNavigate} from 'react-router'
export default function Login() {
    const navigate = useNavigate();
      const { authLogin,logout } = useContext(ContextAPI);
      const [authData, setAuthData] = useState({
        id_card: "",
        password: "",
      });

      const handleChange = (e) =>
        setAuthData({
          ...authData,
          [e.target.name]: e.target.value,
        });
      const handleSubmit = (e) => {
        e.preventDefault();
        authLogin(authData, (err, response) => {
          if (err) {
            toast.error(response);
            return;
          }
          toast.success(response);
          setAuthData({
            id_card: "",
            password: "",
          });
          setTimeout(() => {
            navigate("/projects",{replace: true})
          }, 2000);
        });
      };

      useEffect(()=>{
        logout();
      },[])
  return (
    <Container className='mt-4'>
      <Toaster position="top-center" reverseOrder={false} />
      <Card
        className="box-shadow"
        style={{ width: "100%", border: "none", borderRadius: "10px" }}
      >
        <Card.Body>
          <Card.Title>LOGIN YOUR ACCOUNT</Card.Title>
          <hr />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={authData.id_card}
              name="id_card"
              onChange={handleChange}
              type="text"
              placeholder="your id_number, e,g: C120000"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
    </Container>
  );
}
