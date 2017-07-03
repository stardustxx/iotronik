import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import SideNav from "../../modules/side-nav/side-nav";
import IncidentList from "../incidents-page/incident-list/incident-list";
import GoogleMap from "../../modules/google-map/google-map";

import "./dashboard-page.css";
import tesla from "./tesla.png";

class DashboardPage extends Component {
  style = {
    carCard: {
      marginTop: "2em",
      marginLeft: "2em",
      marginRight: "2em",
      width: "200px",
      height: "100%"
    },
    mapCard: {
      marginTop: "2em",
      marginLeft: "2em",
      marginRight: "2em",
      width: "400px",
      height: "100%"
    },
    incidentsCard: {
      marginTop: "2em",
      marginLeft: "2em",
      marginRight: "2em",
      maxWidth: "350px",
      maxHeight: "800px",
      overflowY: "auto"
    }
  };

  constructor() {
    super();

    this.state = {
      navOpen: false
    };
  }

  onLeftIconButtonTouchTap = () => {
    this.setState((prevState, props) => ({
      navOpen: !prevState.navOpen
    }));
  };

  render() {
    return (
      <div id="dashboard-page">
        <AppBar
          title="IOTronik"
          onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
        />
        <SideNav history={this.props.history} open={this.state.navOpen} />
        <div id="container">
          <Card style={this.style.carCard} className="item">
            <CardMedia overlay={<CardTitle title="Tesla" />}>
              <img src={tesla} alt="" />
            </CardMedia>
            <CardTitle
              title={
                <div>
                  <h4>Condition: Good</h4>
                  <h4>System: Online</h4>
                </div>
              }
            />
          </Card>
          <Card style={this.style.mapCard} className="item">
            <GoogleMap />
          </Card>
          <Card style={this.style.incidentsCard} className="item">
            <CardTitle title="Incidents" />
            <IncidentList showSubHeader={false} />
          </Card>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
