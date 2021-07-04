import React, { Component } from "react";
import { Card, Grid, TextField, Button, Fab, Hidden } from "@material-ui/core";
import { TextFields } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import { browserHistory, withRouter } from "react-router";
import { navigate } from "@reach/router";
import queryString from "query-string";
import axios from "../../axios";
import "../Loading/Loading.css";
import { connect } from "react-redux";
export class Titlecard extends Component {
  state = {
    youtube: [],
    normal: [],

    opendialog: false,
    content: "",
    type: "",
    loading: true,
    nodata: false,
    error: false,
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userId");

    let queryParmas = queryString.parse(this.props.location.search);

    this.setState({
      type: queryParmas.type,
    });
    // queryparams = "?auth=" + this.props.tokenid;

    let types = this.state.type;
    let queryParam =
      "/" +
      queryParmas.type +
      ".json" +
      "?auth=" +
      token +
      '&orderBy="user"&equalTo="' +
      user +
      '"';
    axios
      .get(queryParam)
      .then((res) => res.data)
      .then((data) => {
        let arr = Object.values(data).map((e) => {
          return e.content;
        });
        this.setState({
          [this.state.type]: arr,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          nodata: true,
        });
      });
  }
  addTitle = () => {
    if (this.state.content) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userId");
      this.state[this.state.type].push(this.state.content);

      let data = {
        content: this.state.content,
        user: user,
      };
      axios
        .post(`/${this.state.type}.json?auth=${token}`, JSON.stringify(data))
        .catch((err) => {
          console.log(err);
        });
      this.setState({
        opendialog: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };
  deleteTitle = (e, item) => {
    axios
      .delete(
        `https://linksaver-3202a-default-rtdb.firebaseio.com/${this.state.type}${item}.json`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  totalVideo = (e, section) => {
    this.props.history.push(
      `/youtubevideo?section=${section}&type=${this.state.type}`
    );
  };
  render() {
    return (
      <div>
        <Grid item style={{ marginBottom: "20px" }}>
          <Grid container>
            <Grid item lg={6}></Grid>
            <Grid item lg={6}>
              <Fab
                color="primary"
                onClick={() => this.setState({ opendialog: true })}
              >
                <AddIcon />
              </Fab>
              AddTitle
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.opendialog}
          onBackdropClick={() =>
            this.setState({
              opendialog: false,
            })
          }
        >
          <Grid item style={{ color: this.state.error ? "red" : "black" }}>
            {" "}
            Add your Title
          </Grid>
          <br />
          <span></span>
          <Grid container>
            <Grid item>
              <TextField
                style={{ width: "100%" }}
                color="primary"
                variant="outlined"
                onChange={(e) =>
                  this.setState({
                    content: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item>
              <Button
                style={{ padding: "15px" }}
                variant="contained"
                color="primary"
                onClick={this.addTitle}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Dialog>
        {this.state.loading &&
        this.state[this.state.type] &&
        this.state[this.state.type].length === 0 ? (
          this.state[this.state.type].length === 0 && this.state.nodata ? (
            <>
              <Hidden smUp>
                <div>
                  <img
                    width="100%"
                    height="100%"
                    src="https://i.pinimg.com/originals/48/fb/90/48fb90bcf2a1f779ee66deee8a12c898.png"
                  ></img>
                </div>
              </Hidden>
              <Hidden xsDown>
                <div>
                  <img src="https://i.pinimg.com/originals/48/fb/90/48fb90bcf2a1f779ee66deee8a12c898.png"></img>
                </div>
              </Hidden>
            </>
          ) : (
            <div className="loader"></div>
          )
        ) : (
          <Grid item>
            <Grid container>
              {this.state[this.state.type] &&
                this.state[this.state.type].map((e) => {
                  return (
                    <Grid item lg={4} md={6} sm={6} xs={6}>
                      <Card
                        onClick={(ev) => this.totalVideo(ev, e)}
                        style={{
                          border: "1px solid grey",
                          boxShadow: "2px 3px 2px 3px ",
                          border: "1px solid grey",
                          backgroundImage:
                            "url('https://cdn.wallpapersafari.com/47/85/IPOofC.jpg')",
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                          height: "200px",
                          opacity: "1",
                          margin: "0px 10px",
                          marginBottom: "10px",
                          zIndex: 100,
                          borderRadius: "5px ",
                          cursor: "pointer",
                          height: "150px",
                        }}
                      >
                        <Grid item lg={12}>
                          <Grid
                            item
                            lg={6}
                            style={{
                              margin: "10% auto",
                              zIndex: 600,
                              fontFamily: "Roboto",
                              fontVariant: "normal",
                              fontStyle: "normal",
                              fontSize: "25px",
                              fontWeight: 1000,
                              opacity: "1 !important",
                              color: "purple",
                              textShadow: "purple",
                            }}
                          >
                            <Grid item style={{ marginBottom: "15px" }} lg={6}>
                              {e}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const mapstatetoprops = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isauth: state.tokenid !== null,
    tokenid: state.tokenid,
    userid: state.userid,
    redirectpath: state.redirectpath,
  };
};
export default connect(mapstatetoprops)(Titlecard);
