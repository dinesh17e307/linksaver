import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../Components/store/action/index";
import { connect } from "react-redux";
import "../Loading/Loading.css";
import { Redirect } from "react-router";
import { updateobject, checkvalid } from "../../Components/shared/utilitty";
import axios from "axios";
const Auth = (props) => {
  const [controls, setcontrols] = useState({
    email: {
      elementtype: "input",
      elementconfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      Validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touch: false,
    },
    password: {
      elementtype: "input",
      elementconfig: {
        type: "password",
        placeholder: "Password length greater than 7",
      },
      value: "",
      Validation: {
        required: true,
        minlength: 7,
      },
      valid: false,
      touch: false,
    },
  });
  const [issignup, setissignup] = useState(true);
  const [loading, setloading] = useState(false);
  const { building, redirectpath, onsetredirectpath, tokenid } = props;
  useEffect(() => {
    let isauth = localStorage.getItem("userId");
    if (isauth) {
      onsetredirectpath();
    }
  }, [tokenid, redirectpath]);

  const onauthswitchmodehandler = () => {
    setissignup(!issignup);
  };
  const onchangeformhandler = (event, controlname) => {
    const updatedcontrols = updateobject(controls, {
      [controlname]: updateobject(controls[controlname], {
        value: event.target.value,
        valid: checkvalid(event.target.value, controls[controlname].Validation),
        touch: true,
      }),
    });
    setcontrols(updatedcontrols);
  };
  const auth = (email, password, signup) => {
    const authdata = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhMIwjXgK2l7m5C_zevyYJs6Uqt5Ds39s";
    if (!signup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhMIwjXgK2l7m5C_zevyYJs6Uqt5Ds39s";
    }
    axios
      .post(url, authdata)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        setloading(false);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onsubmithandler = (event) => {
    event.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, issignup);
    auth(controls.email.value, controls.password.value, issignup);
    setloading(true);
  };

  let orderarray = [];
  for (let key in controls) {
    orderarray.push({
      id: key,
      config: controls[key],
    });
  }
  let form = orderarray.map((res) => (
    <Input
      key={res.id}
      elementtype={res.config.elementtype}
      elementconfig={res.config.elementconfig}
      value={res.config.value}
      invalid={!res.config.valid}
      shouldvalidate={res.config.Validation}
      touched={res.config.touch}
      changed={(event) => onchangeformhandler(event, res.id)}
    />
  ));
  if (loading) {
    form = <div className="loader" />;
  }
  let errormsg = null;
  if (props.error) {
    errormsg = <p>{props.error.message}</p>;
  }
  let isauthenticate = null;
  if (props.isauth) {
    isauthenticate = <Redirect to={props.redirectpath} />;
  }

  return (
    <div className={classes.bg}>
      <div className={classes.Auth}>
        {isauthenticate}
        {errormsg}
        <form onSubmit={onsubmithandler}>
          {form}
          <Button btntype="Success">SUBMIT</Button>
        </form>

        <p>
          New user <strong>SIGNUP</strong> Existing user <strong>SIGNIN</strong>
        </p>
        <Button
          clicked={onauthswitchmodehandler}
          btntype={issignup ? "Danger" : "Success"}
        >
          {" "}
          SWITCHED TO {issignup ? "SIGNUP" : "SIGNIN"}
        </Button>
      </div>
    </div>
  );
};

const mapstatetoprops = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isauth: state.tokenid !== null,
    redirectpath: state.redirectpath,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    onAuth: (email, password, issignup) =>
      dispatch(actions.auth(email, password, issignup)),
    onsetredirectpath: () => dispatch(actions.setauthredirectpath("/home")),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(Auth);
