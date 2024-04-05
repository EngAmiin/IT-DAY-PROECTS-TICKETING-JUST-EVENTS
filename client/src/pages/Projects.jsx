import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import AddProjectModal from "../components/AddProjectModal";
import { ContextAPI } from "../context/Provider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Confirm from "../components/Confirm";
export default function Projects() {
  const { removeProject, projectsByUser, user, getCurrentUser, readProjects } =
    useContext(ContextAPI);
  const [open, setOpen] = useState(false);
  const [confirmModal, setConfirmModel] = useState(false);
  const [deletedData, setDeletedData] = useState({
    projectId: "",
    studentId: user[0]?.id,
  });
  const nav = useNavigate();

  const removeData = () => {
    removeProject(deletedData, (err, res) => {
      if (err) {
        toast.error(res);
        return;
      }
      toast.success(res);
      load();
    });
  };
  const load = () => {
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
  };
  useEffect(() => {
    load();
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
      cell: (row) => {
        if (row.status.toLowerCase() === "pending") {
          // Render an icon or badge for pending status
          return <span className="badge bg-primary text-light">Pending</span>;
        } else if (row.status.toLowerCase() === "recjected") {
          return <span className="badge bg-danger text-light">Rejected</span>;
        } else if (row.status.toLowerCase() === "accepted") {
          return (
            <span className="badge bg-secondary text-light">Accepted</span>
          );
        } else if (row.status.toLowerCase() === "passed") {
          return <span className="badge bg-success text-light">Passed 🎉</span>;
        } else {
          return row.status;
        }
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-trash-can text-danger pointer"
            onClick={() => {
              setDeletedData({
                ...deletedData,
                projectId: row.id,
              });
              setConfirmModel(true);
            }}
          ></i>
          <i
            class="fa-solid fa-pencil text-success mx-2"
            title={`edit ${row.ProjectName}`}
          ></i>
        </>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: "4rem" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className='box-shadow'>
        <Card.Body>
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
                  "font-size": "16px",
                },
              },
              headCells: {
                style: {
                  background: "#D4D6F9",
                  "font-size": "15px", // override the cell padding for head cells
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
        </Card.Body>
      </Card>

      <AddProjectModal show={open} handleClose={() => setOpen(false)} />
      <Confirm
        handleConfirm={removeData}
        title={"Confirm To Remove 🧨"}
        message={<strong>Continue To Remove This Project?</strong>}
        show={confirmModal}
        handleClose={() => setConfirmModel(false)}
      />
    </Container>
  );
}
