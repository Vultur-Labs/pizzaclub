import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { DASHBOARD_ORDERS } from "../routes";

import { TableManager } from "./StaffHome";
import { DASHBOARD } from "../routes";

class DashboardHomePage extends Component {
  public render() {
    return <TableManager path={DASHBOARD}/>
  }
}

export default DashboardHomePage;
