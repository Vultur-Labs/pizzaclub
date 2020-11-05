import React, { Component } from "react";

import { TableManager } from "./StaffHome";
import { DASHBOARD } from "../routes";

class DashboardHomePage extends Component {
  public render() {
    return <TableManager path={DASHBOARD}/>
  }
}

export default DashboardHomePage;
