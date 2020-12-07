import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import Components
import { Logo } from "./Common";
// Import Routes
import {
  DASHBOARD,
  DASHBOARD_ORDERS,
  DASHBOARD_PRODUCTS,
  DASHBOARD_EMPLOYEES,
  DASHBOARD_TABLES,
} from "../routes";
// Import Actions
import { logout, fetchPlace } from "../actions/dashboardActions";
import { fetchOrderTable } from "../actions/staffActions";
// Import Getters
import { getOrderTables } from "../reducers/staffReducer";
import { getPlace } from "../reducers/dashboardReducer";
// Import Statics
import logo from "../images/logo.png";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const place = useSelector((state: any) => getPlace(state));
  const tables = useSelector((state: any) => getOrderTables(state));
  const counterTable = tables.reduce(
    (a, t) => (t.items.some((i) => i.status !== "delivered") ? a + 1 : a),
    0
  );

  useEffect(() => {
    dispatch(fetchPlace());
    dispatch(fetchOrderTable());
    // Set an interval of one minute to update the OrderTable data
    const interval = setInterval(() => {
      dispatch(fetchOrderTable());
    }, 60 * 1000);
    // Clear the interval when unmount the component
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const showMenu = useCallback(() => setShow(!show), [show, setShow]);
  const hideMenu = useCallback(() => setShow(false), [setShow]);

  return (
    <nav
      className="navbar has-shadow mb-4 is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Logo className="image is-64x64 mx-3" image={logo} alt="logo" />
        <a
          role="button"
          className={`navbar-burger ${show ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          onClick={showMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navMenu"
        className={`navbar-menu is-expanded has-text-weight-bold has-background-warning ${
          show ? "is-active" : ""
        }`}
      >
        <div className="navbar-start" onClick={hideMenu}>
          <Link className="navbar-item brand-text" to={DASHBOARD}>
            <span className="is-capitalized">{place.name}</span>
            {!!counterTable && (
              <span className="tag is-danger">{counterTable}</span>
            )}
          </Link>

          <Link className="navbar-item" to={DASHBOARD_ORDERS}>
            Ordenes
          </Link>

          <Link className="navbar-item" to={DASHBOARD_PRODUCTS}>
            Productos
          </Link>

          <Link className="navbar-item" to={DASHBOARD_EMPLOYEES}>
            Empleados
          </Link>
          <hr className="navbar-divider" />

          <Link className="navbar-item" to={DASHBOARD_TABLES}>
            Mesas
          </Link>
        </div>

        <div className="navbar-end mx-3">
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
