import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Progress from "./Progress";
import Pie from "../charts/Pie";
import { ContextAPI } from "../context/Provider";
import { convertDatetimeToDate } from "../utils/fun.utils";
import Skeleton from '@mui/material/Skeleton';
import CountUp from 'react-countup';
export default function Report(props) {
  const {chartProjectsByType,getProjectsByType,getCurrentStudentsByEvent,STUDENTS_BY_EVENT,
    event_report,loadActiveEventReport}= useContext(ContextAPI)
  useEffect(()=>{
    getProjectsByType(function(){});
    getCurrentStudentsByEvent(function(){});
    loadActiveEventReport(function(){});
  },[])
  return (
    <>
      {Object.keys(event_report).length > 0 ? (
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
                    <td>
                      {event_report.id ? (
                        event_report.id
                      ) : (
                        <Skeleton animation="wave" width={100} />
                      )}
                    </td>
                    <td>
                      {event_report.eventName ? (
                        event_report.eventName
                      ) : (
                        <Skeleton />
                      )}
                    </td>
                    <td>
                      {event_report.from_register ? (
                        convertDatetimeToDate(event_report.from_register)
                      ) : (
                        <Skeleton animation="wave" width={100} />
                      )}
                    </td>
                    <td>
                      {event_report.to_register ? (
                        convertDatetimeToDate(event_report.to_register)
                      ) : (
                        <Skeleton animation="wave" width={100} />
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Start Date</td>
                    <td colSpan={4}>
                      {event_report.due_date ? (
                        convertDatetimeToDate(event_report.due_date)
                      ) : (
                        <Skeleton animation="wave" width={100} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Number Of Students Allowed</td>
                    <td colSpan={2}>
                      {STUDENTS_BY_EVENT.RangeStudents ? (
                       // console.log(STUDENTS_BY_EVENT.RangeStudents)
                      //   <CountUp
                    
                      //   end={STUDENTS_BY_EVENT.RangeStudents}
                      //   duration={3.75}                 
                      //   decimal=","
                      //   suffix=" Students"       
                      // >
                      //   {({ countUpRef, start }) => (
                      //     <div>
                      //       <span className="fw-bold" ref={countUpRef} />
                            
                      //     </div>
                      //   )}
                      // </CountUp>
                        `${STUDENTS_BY_EVENT.RangeStudents} Students`
                      ) : (
                        <Skeleton animation="wave" width={100} />
                      )}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3" colSpan={5}>
                      <h6> Current Students Registered</h6>
                      <div className="my-3">
                        <Progress
                          completedCount={STUDENTS_BY_EVENT.CurrentStudents}
                          maxCompletedCount={STUDENTS_BY_EVENT.RangeStudents}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-center bg-secondary text-light"
                      colSpan={8}
                    >
                      Projects For This Event
                    </th>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <Pie pieData={chartProjectsByType} />
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      ) : null}
    </>
  );
}
