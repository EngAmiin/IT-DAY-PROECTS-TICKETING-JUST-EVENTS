import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Progress from "./Progress";
import Pie from "../charts/Pie";
import { ContextAPI } from "../context/Provider";
import { convertDatetimeToDate } from "../utils/fun.utils";

export default function Report(props) {
  const {chartProjectsByType,getProjectsByType,getCurrentStudentsByEvent,STUDENTS_BY_EVENT,
    event_report,loadActiveEventReport}= useContext(ContextAPI)
  useEffect(()=>{
    getProjectsByType(function(){});
    getCurrentStudentsByEvent(function(){});
    loadActiveEventReport(function(){});
  },[])
  return (
    <Container style={{ marginTop: "6rem", marginBottom: "10px" }}>
      <h4 className="my-5 text-center">Upcoming Event 📢</h4>
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
                <td>{event_report.id}</td>
                <td>{event_report.eventName}</td>
                <td>{convertDatetimeToDate(event_report.from_register)}</td>
                <td>{convertDatetimeToDate(event_report.to_register)}</td>
             
              </tr>

              <tr>
                <td>Start Date</td>
                <td colSpan={4}>{convertDatetimeToDate(event_report.due_date)}</td>
              </tr>
              <tr>
                <td colSpan={2}>Number Of Students Allowed</td>
                <td colSpan={2}>{STUDENTS_BY_EVENT.RangeStudents? `${STUDENTS_BY_EVENT.RangeStudents} Students`: "Loading"} </td>
              </tr>
              <tr>
                <td className="p-3" colSpan={5}>
                  <h6> Current Students Registered</h6>
                  <div className='my-3'>
                    <Progress completedCount={STUDENTS_BY_EVENT.CurrentStudents} maxCompletedCount={STUDENTS_BY_EVENT.RangeStudents}/>
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
                <td colSpan={5}>
                    <Pie pieData={chartProjectsByType}/>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
