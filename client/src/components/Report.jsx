import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Progress from "./Progress";

export default function Report(props) {
  return (
    <Container style={{ marginTop: "6rem", marginBottom: "10px" }}>
      <h4 className="my-5 text-center">Upcoming Evenet 📢</h4>
      <Card className="border-0 box-shadow">
        <Card.Body>
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th
                  className="text-center  bg-secondary text-light"
                  colSpan={8}
                >
                  Event Report
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>Event</th>
                <th>From Register</th>
                <th>To Register</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>

              <tr>
                <td>Start Date</td>
                <td colSpan={4}>N/A</td>
              </tr>
              <tr>
                <td colSpan={2}>Number Of Students Allowed</td>
                <td colSpan={2}>N/A</td>
              </tr>
              <tr>
                <td className="p-3" colSpan={5}>
                  <h6> Current Students As Percentage</h6>
                  <div className='my-3'>
                    <Progress />
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th className="text-center bg-secondary text-light" colSpan={8}>
                  Projects For This Event
                </th>
              </tr>
              <tr>
                <td colSpan={5}>Projects Type By Chart</td>
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
