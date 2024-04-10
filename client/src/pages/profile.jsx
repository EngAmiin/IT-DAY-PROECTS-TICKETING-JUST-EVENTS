import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ContextAPI } from "../context/Provider";
import { Toaster, toast } from "react-hot-toast";
export default function Profile() {
  const imageStyle = {
    width: "320px", // Set the desired width
    height: "320px", // Set the desired height
    objectFit: "cover", // Preserve the aspect ratio and fill the container
  };

  const {
    isValidCurrentPassword,
    updateProfile,
    load,
    getCurrentUser,
    user,
    getCurrentUserData,
    currentUserData,
  } = useContext(ContextAPI);
  const [profile, setProfile] = useState({
    type: "data"
  });
  const [newPass, setNewPass] = useState({
    type : "privacy",
    id : user[0]?.id || 0,
    currentPassword: "",
    newPass: "",
    confirmPass: "",
  });
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangePass = (e) => {
    setNewPass({
      ...newPass,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    console.log(profile);
    updateProfile(profile, (err, res) => {
      if (err) {
        toast.error(res);
        return;
      }
      toast.success(res);
      getCurrentUserData(user[0]?.id, function () {});
    });
  };
  const handlePrivacyUpdating = (e) => {
    isValidCurrentPassword(user[0].id, newPass, (err, res) => {
      if (err) {
        toast.error(res);
        return;
      }
      updateProfile(newPass,(err, res) => {
         if (err) {
           toast.error(res);
           return;
         }
         toast.success(res);
      })    
      // getCurrentUserData(user[0]?.id, function () {});
    });
  };
  useEffect(() => {
    getCurrentUser();
    getCurrentUserData(user[0]?.id, function () {});
    setProfile(currentUserData);
    console.log(currentUserData);
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="box-shadow border-0">
        <Card.Body>
          <Typography>My Profile</Typography>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="my-4"
          >
            <Tab eventKey="profile" title="Profile">
              <Grid container rowGap={0} rowSpacing={0} spacing={0}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Image
                    style={imageStyle}
                    src="../../avatar.jpg"
                    rounded
                    className="img-fluid"
                  />
                  <Typography component={"h6"}>
                    {currentUserData && currentUserData.FullName}
                  </Typography>
                </Grid>

                <Grid item lg={8} md={12} sm={12} xs={12}>
                  {!load && profile ? (
                    <Form>
                      <Grid container>
                        <Grid item lg={12} md={12} xs={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                              disabled
                              type="text"
                              defaultValue={
                                currentUserData && currentUserData.id_card
                              }
                              name="id_card"
                              value={profile && profile.id_card}
                              onChange={handleChange}
                              placeholder="id"
                            />
                          </Form.Group>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>FullName</Form.Label>
                            <Form.Control
                              disabled
                              defaultValue={
                                currentUserData && currentUserData.FullName
                              }
                              type="text"
                              placeholder="name"
                            />
                          </Form.Group>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              name="email"
                              value={profile.email && profile.email}
                              onChange={handleChange}
                              type="email"
                              placeholder="e.g a@gmail.com"
                            />
                          </Form.Group>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                              name="mobile"
                              value={profile && profile.mobile}
                              onChange={handleChange}
                              defaultValue={
                                currentUserData && currentUserData.mobile
                              }
                              type="number"
                              placeholder="61xxxxxxx"
                            />
                          </Form.Group>
                        </Grid>
                      </Grid>
                    </Form>
                  ) : (
                    "Loading"
                  )}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button
                    onClick={handleSubmit}
                    variant="outline-secondary"
                    className="w-100"
                  >
                    Sva My Data
                  </Button>
                </Grid>
              </Grid>
            </Tab>
            <Tab eventKey="privacy" title="privacy">
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Current Password *</Form.Label>
                      <Form.Control
                        name="currentPassword"
                        value={newPass.currentPassword}
                        onChange={handleChangePass}
                        type="text"
                        placeholder="Enter current password"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>New Password *</Form.Label>
                      <Form.Control
                        type="text"
                        name="newPass"
                        value={newPass.newPass}
                        onChange={handleChangePass}
                        placeholder="Enter new password"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Confirm New Password *</Form.Label>
                      <Form.Control
                        name="confirmPass"
                        value={newPass.confirmPass}
                        onChange={handleChangePass}
                        type="text"
                        placeholder="Confirm new password"
                      />
                    </Form.Group>
                    <Button
                      onClick={handlePrivacyUpdating}
                      variant="secondary"
                      className="w-100"
                    >
                      Change
                    </Button>
                  </Form>
                </Grid>
              </Grid>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}
