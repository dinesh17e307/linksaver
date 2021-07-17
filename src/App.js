import logo from "./logo.svg";
import "./App.css";
import { Backdrop, Fab } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";

import Titlecard from "./Components/TitleCard/Titlecard";
import VideoComponent from "./Components/videoComponent/VideoComponent";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter,
} from "react-router-dom";
import { navigate } from "@reach/router";
import LandingPage from "./Components/LandingPage/LandingPage";
import NormalVideo from "./Components/NormalVideo/NormalVideo";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Auth from "./Components/Auth/Auth";
import { connect } from "react-redux";
import * as actions from "./Components/store/action/index";
import "./Components/Loading/Loading.css";
import Logout from "./Components/Logout";
const App = (props) => {
  const [loading, setloading] = useState(false);
  const [logouts, setlogouts] = useState(false);
  useEffect(() => {
    props.onauthcheck();
  }, []);
  const logout = async () => {
    setloading(true);
    props.onlogout();
    setloading(false);
    setlogouts(true);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <Router>
            <Route exact path="/youtubevideo" component={VideoComponent} />
            <Route exact path="/normalvideo" component={NormalVideo} />
            <Route exact path="/addvideo" component={Titlecard} />
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/" component={Auth} />
            <Redirect to="/" />
          </Router>

          <Grid item>
            <Grid
              container
              lg={12}
              xs={12}
              style={{
                position: "relative",
                bottom: "10px",
                left: "10%",
                alignContent: "center",
                marginTop: "20px",
              }}
            >
              {/* <Grid item lg={6} xs={6}>
                <Fab variant="extended" color="primary">
                  {" "}
                  <ChatBubbleIcon />
                  FeedBack
                </Fab>
              </Grid> */}
              {/* <Grid item lg={6} xs={6}>
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={logout}
                  style={{ display: props.isauth ? "" : "none" }}
                >
                  {" "}
                  <ChatBubbleIcon />
                  LOGOUT
                </Fab>
              </Grid> */}
            </Grid>
          </Grid>
        </>
      )}
    </div>
    // </div>
  );
};

const mapstatetoprops = (state) => {
  return {
    isauth: state.tokenid !== null,
    tokenid: state.tokenid,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onauthcheck: () => dispatch(actions.authcheckstate()),
    onsetredirectpath: () => dispatch(actions.setauthredirectpath()),
    onlogout: () => dispatch(actions.logout()),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(App);
