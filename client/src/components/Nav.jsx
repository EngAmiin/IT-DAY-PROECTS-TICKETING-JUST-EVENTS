import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Link to="/" className='text-decoration-none text-secondary fw-bold'>
            IT-DAY PROJECTS
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <Link to="/register">Join Now</Link>
           <Link to="/projects" className='mx-2'>My Projects</Link>
           <a href="#login">Account</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
