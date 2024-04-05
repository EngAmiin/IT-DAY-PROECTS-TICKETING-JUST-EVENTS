import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import AddProjectModal from "../components/AddProjectModal";
import { ContextAPI } from "../context/Provider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
export default function Projects() {
  const { projectsByUser, user, getCurrentUser, readProjects } =
    useContext(ContextAPI);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
const load =()=>{
  getCurrentUser();
  if (user.length > 0) {
    readProjects(user[0]?.id, function (err, res) {
      if (err) {
        toast.error(res);
        return;
      }
    });
  } else {
    nav("/");
  }
}
  useEffect(() => {
    load()
  }, []);

  const columns = [
    {
      name: "Project",
      selector: (row) => row.ProjectName,
    },
    {
      name: "Type",
      sortable: true,
      selector: (row) => row.type,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
    },
  ];

  return (
    <Container style={{ marginTop: "4rem" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Row className="mb-3">
        <Col lg={10} md={12} sm={12} xs={12}>
          <h4>My Projects 🔥💖</h4>
        </Col>
        <Col lg={2} md={12} sm={12} xs={12}>
          <Button onClick={() => setOpen(true)} variant="outline-secondary">
            Add New ✔
          </Button>
        </Col>
      </Row>
      <DataTable
        customStyles={{
          cells: {
            style: {
              "font-size": "17px",
            },
          },
          headCells: {
            style: {
              background: "#A2A5F9",
              "font-size": "24px", // override the cell padding for head cells
            },
          },
        }}
        highlightOnHover={true}
        pagination
        dense
        striped
        selectableRows
        columns={columns}
        data={projectsByUser}
      />

      <AddProjectModal show={open} handleClose={() => setOpen(false)} />
    </Container>
  );
}
