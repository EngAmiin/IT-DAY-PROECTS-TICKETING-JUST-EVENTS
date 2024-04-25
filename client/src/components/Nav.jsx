import React, { useContext, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { ContextAPI } from '../context/Provider';
import { useTranslation } from "react-i18next";
export default function Nav() {
  const { logout,user } = useContext(ContextAPI);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
                    {t("My Projects")}
                  </Link>
                  <Link to={"/account"}>{t("Account")}</Link>
                  <Link to={"/login"} className="mx-2">
                    {t("Logout")}
                  </Link>
                  <Link className="mx-2" to="https://wa.link/lntytz">
                    {t("Support")}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">{t("Join Now")}</Link>
                  <Link className="mx-2" to="/login">
                    {t("Login")}
                  </Link>
                  <Link className="mx-2" to="https://wa.link/lntytz">
                    {t("Support")}
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
