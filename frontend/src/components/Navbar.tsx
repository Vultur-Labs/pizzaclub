import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import Components
import { Logo } from "./Common";
// Import Routes
import {
  DASHBOARD,
  DASHBOARD_ORDERS,
  // DASHBOARD_PRODUCTS,
  DASHBOARD_EMPLOYEES,
  DASHBOARD_TABLES,
} from "../routes";
// Import Actions
import { logout } from "../actions/dashboardActions";
import { fetchOrderTable } from "../actions/staffActions";
// Import Getters
import { getOrderTables } from "../reducers/staffReducer";
// Import Statics
import logo from "../images/logo.png";

export const Navbar = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state: any) => getOrderTables(state));
  const counterTable = tables.reduce(
    (a, t) => (t.items.some((i) => i.status !== "delivered") ? a + 1 : a),
    0
  );

  useEffect(() => {
    dispatch(fetchOrderTable());
    // Set an interval of one minute to update the OrderTable data
    const interval = setInterval(() => {
      dispatch(fetchOrderTable());
    }, 60 * 1000);
    // Clear the interval when unmount the component
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <nav className="navbar has-shadow mb-4 px-3 is-warning">
      <div className="navbar-brand navbar-start">
        <Logo className="image is-64x64" image={logo} alt="logo" />
      </div>

      <div id="navMenu" className="navbar-menu has-text-weight-bold">
        <div className="navbar-start">
          <Link className="navbar-item brand-text" to={DASHBOARD}>
            <span className="mr-2">The Pizza Club</span>
            {!!counterTable && (
              <span className="tag is-danger">{counterTable}</span>
            )}
          </Link>

          <Link className="navbar-item" to={DASHBOARD_ORDERS}>
            Ordenes
          </Link>

          {/* <Link className="navbar-item" to={DASHBOARD_PRODUCTS}>
              Productos
            </Link> */}

          <Link className="navbar-item" to={DASHBOARD_EMPLOYEES}>
            Empleados
          </Link>

          <Link className="navbar-item" to={DASHBOARD_TABLES}>
            Mesas
          </Link>
        </div>

        <div className="navbar-end">
          <span className="navbar-item">
            <div className="field">
              <p className="control">
                <button
                  type="button"
                  className="button is-danger"
                  onClick={handleLogout}
                >
                  <strong>Salir</strong>
                </button>
              </p>
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
};
