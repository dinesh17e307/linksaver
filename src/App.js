import logo from "./logo.svg";
import "./App.css";
import { Backdrop, Fab } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";

import Titlecard from "./Components/TitleCard/Titlecard";
import VideoComponent from "./Components/videoComponent/VideoComponent";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { navigate } from "@reach/router";
import LandingPage from "./Components/LandingPage/LandingPage";
import NormalVideo from "./Components/NormalVideo/NormalVideo";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Auth from "./Components/Auth/Auth";
import { connect } from "react-redux";
import * as actions from "./Components/store/action/index";
const App = (props) => {
  useEffect(() => {
    props.onauthcheck();
  }, []);
  return (
    <div className="App">
      <div>
        {/* <Paper style={{ backgroundColor: "skyblue", color: "black" }}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Toolbar className="appbar">
                <Grid xs={2} sm={3}>
                  Home
                </Grid>
                <Grid xs={2} sm={3}>
                  About us
                </Grid>
                <Grid xs={2} sm={3}>
                  Contact us
                </Grid>
              </Toolbar>
            </Grid>
          </Paper> */}
      </div>

      {/* <div style={{ marginTop: "50px", width: "200px" }}> */}
      {/* <IconButton color="primary">
            <PhotoCamera
              onClick={this.opencam}
              style={{ width: "100px", height: "100px" }}
            />
          </IconButton> */}

      {/* {webcam}
          <Imgs /> */}
      {/* </div> */}
      <Router>
        <Route exact path="/youtubevideo" component={VideoComponent} />
        <Route exact path="/normalvideo" component={NormalVideo} />
        <Route exact path="/addvideo" component={Titlecard} />
        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/" component={Auth} />
      </Router>
      <Grid
        item
        lg={9}
        xs={12}
        style={{
          position: "relative",
          bottom: "10px",
          left: "10%",
          alignContent: "center",
          marginTop: "20px",
        }}
      >
        <Fab variant="extended" color="primary">
          {" "}
          <ChatBubbleIcon />
          FeedBack
        </Fab>
      </Grid>
    </div>
    // </div>
  );
};

const mapstatetoprops = (state) => {
  return {
    isauth: state.tokenid !== null,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onauthcheck: () => dispatch(actions.authcheckstate()),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(App);
