import "./styles/main.css";
import "@fortawesome/fontawesome-free/js/all";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

//Import Constants
import { DELIVERY_MODE, TAKEAWAY_MODE } from "./constants";
//Import Routes
import {
  INDEX,
  MENU,
  DELIVERY,
  TAKEAWAY,
  DELIVERY_CART,
  TAKEAWAY_CART,
  CONFIRM_CART,
  DASHBOARD,
  DASHBOARD_LOGIN,
} from "./routes";
import PrivateRoute from "./components/PrivateRoute";
// Import Pages
import MainPage from "./pages/MainPage";
import MenuPage from "./pages/MenuPage";
import DeliveryPage from "./pages/DeliveryPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/Dashboard";
import DashboardLoginPage from "./pages/DashboardLogin";

class App extends Component {
  render() {
    const deliveryCost = document.getElementById("app").dataset[
      "delivery_cost"
    ];
    return (
      <BrowserRouter basename="">
        <Switch>
          <Route exact path={INDEX} component={MainPage} />

          <Route path={MENU} component={MenuPage} />

          <Route
            path={[TAKEAWAY_CART, DELIVERY_CART]}
            children={({ match }) => {
              const goBack = match.url === TAKEAWAY_CART ? TAKEAWAY : DELIVERY;
              return (
                <CartPage
                  path={match.path}
                  goBack={goBack}
                  goConfirm={CONFIRM_CART}
                />
              );
            }}
          />

          <Route path={DELIVERY}>
            <DeliveryPage
              goBack={INDEX}
              goCart={DELIVERY_CART}
              mode={DELIVERY_MODE}
              shipping={parseFloat(deliveryCost)}
              interactive={true}
            />
          </Route>

          <Route path={TAKEAWAY}>
            <DeliveryPage
              goBack={INDEX}
              goCart={TAKEAWAY_CART}
              mode={TAKEAWAY_MODE}
              shipping={0.0}
              interactive={true}
            />
          </Route>

          <PrivateRoute exact path={DASHBOARD} redirect={DASHBOARD_LOGIN}>
            <DashboardPage />
          </PrivateRoute>

          <Route path={DASHBOARD_LOGIN}>
            <DashboardLoginPage />
          </Route>

          {/*<Route component={NotFound}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
