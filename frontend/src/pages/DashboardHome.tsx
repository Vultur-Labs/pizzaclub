import React, { Component } from "react";

// Import Pages
import { TableManager } from "./StaffHome";
// Import Routes
import { DASHBOARD } from "../routes";

class DashboardHomePage extends Component {
  public render() {
    return <TableManager path={DASHBOARD} />;
  }
}

export default DashboardHomePage;
