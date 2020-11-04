import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { DASHBOARD_ORDERS } from "../routes";

class DashboardHomePage extends Component {
  public render() {
    return (
      <Redirect
        to={{
          pathname: DASHBOARD_ORDERS,
        }}
      />
    );
  }
}

export default DashboardHomePage;
