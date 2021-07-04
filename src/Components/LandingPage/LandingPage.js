import { Grid, Card, Typography, Fab } from "@material-ui/core";
import React, { Component } from "react";
import { navigate } from "@reach/router";
import "./Loading.css";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
export class LandingPage extends Component {
  state = {
    loading: false,
  };
  navigateHandler = (value) => {
    this.setState({
      loading: true,
    });
    if (value === "normal") this.props.history.push(`/addvideo?type=${value}`);
    else {
      this.props.history.push(`/addvideo?type=${value}`);
    }
    this.setState({
      loading: false,
    });
  };
  mailtosupport = () => {};
  render() {
    return (
      <div>
        <Grid item lg={12} sx={12}>
          <Grid item>
            <Typography
              variant="h6"
              color="primary"
              style={{
                marginBottom: "55px",
                color: `#88989A`,
                height: `43px`,
                fontSize: `27px`,
                textAlign: `center`,
                fontWeight: `00`,
                fontFamily: `Roboto`,
                fontVariant: `normal`,
                fontStyle: `italic`,
              }}
            >
              Your Personal Video Assiant ,Save Your All Link You Need
            </Typography>
          </Grid>
          {this.state.loading ? (
            <div className="loader"></div>
          ) : (
            <Grid item lg={8} xs={6} style={{ margin: "auto auto" }}>
              <Grid container lg={10}>
                <Grid item lg={6} xs={12}>
                  <Card
                    style={{
                      border: "1px solid grey",
                      boxShadow: "2px 3px 2px 3px ",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundImage:
                        'url("data:image/jpeg;base64,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")',
                      height: "200px",
                      opacity: "0.5",
                      margin: "0px 10px",
                      marginBottom: "10px",
                      zIndex: 100,
                      borderRadius: "15px ",
                      cursor: "pointer",
                    }}
                    onClick={() => this.navigateHandler("normal")}
                  >
                    <span
                      style={{
                        margin: "30% auto",
                        zIndex: 600,
                        fontFamily: "sans-serif",
                        fontSize: "25px",
                        fontWeight: 1000,
                        color: "white",
                        textShadow: "black",
                      }}
                    >
                      Normal
                    </span>
                  </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Card
                    style={{
                      border: "1px solid grey",
                      boxShadow: "2px 3px 2px 3px ",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundImage:
                        'url("https://akm-img-a-in.tosshub.com/indiatoday/images/story/202106/youtube_(1).jpg?MlQf6OqTANjD0p2gN3yjSLoNR2WA9FDa&size=770:433")',
                      height: "200px",
                      opacity: "0.5",
                      margin: "0px 10px",
                      marginBottom: "10px",
                      zIndex: 100,
                      borderRadius: "15px ",
                      cursor: "pointer",
                    }}
                    onClick={() => this.navigateHandler("youtube")}
                  >
                    <span
                      style={{
                        margin: "30% 35%",
                        zIndex: 600,
                        fontFamily: "sans-serif",
                        fontSize: "25px",
                        fontWeight: 1000,
                        color: "white",
                        textShadow: "black",
                      }}
                    >
                      Youtube
                    </span>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default LandingPage;
