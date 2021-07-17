import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter,
} from "react-router-dom";
import Auth from "./Auth/Auth";
export class Logout extends Component {
  Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    this.props.history.push("/");
  };
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
