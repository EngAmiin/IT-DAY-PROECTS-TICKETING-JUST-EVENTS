import React,{useState} from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Row,Col} from "react-bootstrap";
import DataTable from "react-data-table-component";
import AddProjectModal from '../components/AddProjectModal';
export default function Projects() {
       const [open, setOpen] = useState(false);
const columns = [
  {
    
    name: "Project",
    selector: (row) => row.title,
  },
  {
    name: "Type",
    sortable: true,
    
    selector: (row) => row.year,
  },
  {
    name: "Year",
    sortable: true,
    
    selector: (row) => row.year,
  },
  {
    name: "Registered",
    sortable: true,
    
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    year: "1988",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    year: "1984",
    year: "1984",
  },
];
  return (
    <Container style={{ marginTop: "4rem" }}>
      <Row className="mb-3">
        <Col lg={10} md={12} sm={12} xs={12}>
          <h4>My Projects 🔥💖</h4>
        </Col>
        <Col lg={2} md={12} sm={12} xs={12}>
          <Button onClick={()=> setOpen(true)} variant="outline-secondary">Add New ✔</Button>
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
        data={data}
      />

      <AddProjectModal show={open} handleClose={()=>setOpen(false)}/>
    </Container>
  );
}
