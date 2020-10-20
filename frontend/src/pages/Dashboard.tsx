import React, { FC, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { DASHBOARD, DASHBOARD_ORDERS, DASHBOARD_PRODUCTS } from "../routes";
import DashboardHomePage from "./DashboardHome";
import DashboardProductsPage from "./DashboardProduct";
import DashboardOrdersPage from "./DashboardOrder";
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
    if (!account?.id) {
      router.push(DASHBOARD);
    }
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
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
