import React, { useContext, useEffect,useNavigate } from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import { Link } from 'react-router-dom';
import { ContextAPI } from '../context/Provider';
export default function Nav() {
  const { logout,user } = useContext(ContextAPI);
  
  return (
    <>
      <Alert variant="success" className="text-center fw-bold">
         JUTSA PORTAL UP COMING 🔥🤗
      </Alert>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link to="/" className="text-decoration-none text-secondary fw-bold">
            IT-DAY PROJECTS
          </Link>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user?.length > 0 ? (
                <>
                  {" "}
                  <Link to="/projects" className="mx-2">
                    My Projects
                  </Link>
                  <a href="#login">Account</a>
                  <Link
                    onClick={() => {
                      logout().then((v) => {});
                    }}
                    className="mx-2"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <Link to="/register">Join Now</Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
