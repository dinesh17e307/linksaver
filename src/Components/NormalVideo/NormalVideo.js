import { Grid, TextField, Button, Card, Dialog, Fab } from "@material-ui/core";
import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";
import { Player } from "video-react";
import AddIcon from "@material-ui/icons/Add";
// Only loads the YouTube player

export class NormalVideo extends Component {
  state = {
    link: "",
    arr: [
      "https://media.istockphoto.com/videos/set-of-explosive-motion-graphic-elements-video-id1204572973",
    ],
    opendialog: false,
  };
  addLink = () => {
    this.state.arr.push(this.state.link);

    this.setState({
      opendialog: false,
    });
  };
  render() {
    console.log(this.state.arr);
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
        <Dialog open={this.state.opendialog}>
          <Grid item>
            <Grid container>
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
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Grid container>
          {this.state.arr.map((e) => {
            return (
              <Grid item lg={3} xs={12}>
                <Card style={{ margin: "0px 10px", marginBottom: "10px" }}>
                  <video width="320" height="240" controls>
                    <source src={e} />
                  </video>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default NormalVideo;
