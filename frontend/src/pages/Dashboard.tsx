import React, { FC, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { 
  DASHBOARD,
  DASHBOARD_ORDERS,
  DASHBOARD_PRODUCTS,
  DASHBOARD_EMPLOYEES,
  DASHBOARD_TABLES,
  STAFF_HOME
} from "../routes";
import DashboardHomePage from "./DashboardHome";
import DashboardProductsPage from "./DashboardProduct";
import DashboardOrdersPage from "./DashboardOrder";
import DashboardEmployeesPage from "./DashboardEmployees";
import DashboardTablesPage from "./DashboardTables";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlace } from "../actions/dashboardActions";

const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: any) => state.dashboard.account);
  const router = useHistory();

  useEffect(() => {
    dispatch(fetchPlace());
  }, [dispatch]);

  useEffect(() => {
    if (account?.is_staff || account?.is_superuser) {router.push(DASHBOARD) }
    else if (account?.is_order_manager) router.push(STAFF_HOME);
  }, [account, router]);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="columns">
          <div className="column">
            <Switch>
              <Route exact path={DASHBOARD}>
                <DashboardHomePage />
              </Route>
              <Route path={DASHBOARD_PRODUCTS}>
                <DashboardProductsPage />
              </Route>
              <Route path={DASHBOARD_ORDERS}>
                <DashboardOrdersPage />
              </Route>
              <Route path={DASHBOARD_EMPLOYEES}>
                <DashboardEmployeesPage />
              </Route>
              <Route path={DASHBOARD_TABLES}>
                <DashboardTablesPage />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
