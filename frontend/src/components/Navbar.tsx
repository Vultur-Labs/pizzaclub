import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/dashboardActions";
import { Logo } from "./Common";
import {
  DASHBOARD,
  DASHBOARD_ORDERS,
  // DASHBOARD_PRODUCTS,
  DASHBOARD_EMPLOYEES,
  DASHBOARD_TABLES,
} from "../routes";
import logo from "../images/logo.png";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <nav className="navbar has-shadow mb-4 px-3 is-warning">
      <div className="navbar-brand navbar-start">
        <Logo className="image is-64x64" image={logo} alt="logo" />
      </div>

      <div id="navMenu" className="navbar-menu has-text-weight-bold">
        <div className="navbar-start">
          <Link className="navbar-item brand-text" to={DASHBOARD}>
            The Pizza Club
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
