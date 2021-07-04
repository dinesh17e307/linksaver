import {
  Grid,
  TextField,
  Button,
  Card,
  Dialog,
  Fab,
  Hidden,
} from "@material-ui/core";
import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";
import { Player } from "video-react";
import AddIcon from "@material-ui/icons/Add";
import queryString from "query-string";
// Only loads the YouTube player
import axios from "../../axios";
import "../Loading/Loading.css";
import { connect } from "react-redux";
export class VideoComponent extends Component {
  state = {
    link: "",
    linkArr: {},
    youtube: [],
    normal: [],
    type: "",
    opendialog: false,
    section: "",
    loading: true,
    nodata: false,
    error: false,
  };
  updatecall = () => {
    this.setState({
      loading: false,
      nodata: true,
    });

    // axios
    //   .get(
    //     `https://linksaver-3202a-default-rtdb.firebaseio.com/${this.state.section}.json`
    //   )
    //   .then((res) => res.data)
    //   .then((data) => {
    //     console.log(Object.values(data[this.state.section]));
    //     this.setState({
    //       linkArr: { ...data },
    //       loading: false,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    // this.setState({
    //   nodata: true,
    // });
    // });
  };
  componentDidMount() {
    let queryParmas = queryString.parse(this.props.location.search);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userId");

    this.setState({
      section: queryParmas.section,
      type: queryParmas.type,
    });
    let queryParam =
      "/" +
      queryParmas.type +
      "/" +
      queryParmas.section +
      ".json" +
      "?auth=" +
      token;
    axios
      .get(queryParam)
      .then((res) => res.data)
      .then((data) => {
        let arr = Object.values(data).map((e) => {
          return e.link;
        });
        this.setState({
          [this.state.type]: arr,
          linkArr: { ...data },
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
  addLink = async () => {
    let queryParmas = queryString.parse(this.props.location.search);
    if (this.state.link) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userId");
      this.setState({
        loading: true,
        nodata: false,
      });
      let data = {
        link: this.state.link,
        user: user,
      };
      this.state[this.state.type].push(this.state.link);
      await axios
        .post(
          `/${this.state.type}/${queryParmas.section}.json?auth=${token}`,
          JSON.stringify(data)
        )
        .catch((err) => {
          console.log(err);
        });

      this.setState({
        opendialog: false,
        loading: false,
        link: "",
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div>
        <Grid item>
          <Grid container>
            <Grid item lg={6}></Grid>
            <Grid item lg={6}>
              <Fab
                color="primary"
                onClick={() => this.setState({ opendialog: true })}
              >
                <AddIcon />
              </Fab>
              AddLink
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
          <Grid item>
            <Grid item>
              {" "}
              <span
                style={{
                  color: !this.state.error ? "black" : "red",
                }}
              >
                Enter the URL
              </span>
            </Grid>
            <Grid container lg={12}>
              <Grid item lg={8}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  color="primary"
                  onChange={(e) =>
                    this.setState({
                      link: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item lg={4}>
                <Button
                  onClick={this.addLink}
                  style={{ padding: "15px" }}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        {this.state.loading && !this.state.nodata ? (
          <div className="loader"></div>
        ) : this.state.nodata ? (
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
          <div>
            {this.state.type === "youtube" ? (
              <Grid container>
                {this.state[this.state.type] &&
                  Object.values(this.state[this.state.type]).map((e) => {
                    return (
                      <Grid item lg={4} xs={12}>
                        <Card
                          style={{
                            margin: "0px 10px",

                            marginBottom: "10px",
                            borderRadius: "15px",
                            height: "280px",
                          }}
                        >
                          <ReactPlayer
                            controls
                            width="100%"
                            height="100%"
                            url={e}
                          />
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            ) : (
              <Grid container>
                {this.state[this.state.type] &&
                  Object.values(this.state[this.state.type]).map((e) => {
                    return (
                      <Grid item lg={3} xs={12}>
                        <Card
                          style={{
                            margin: "0px 10px",
                            marginBottom: "10px",
                            borderRadius: "15px",
                            height: "280px",
                          }}
                        >
                          <video controls width="100%" height="100%">
                            <source src={e} />
                          </video>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            )}
          </div>
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
export default connect(mapstatetoprops)(VideoComponent);
