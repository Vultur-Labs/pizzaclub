import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/dashboardActions";
import { 
  DASHBOARD,
  DASHBOARD_ORDERS,
  DASHBOARD_PRODUCTS,
  DASHBOARD_EMPLOYEES,
  DASHBOARD_TABLES
} from "../routes";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <nav className="navbar is-spaced has-shadow mb-4">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item brand-text" to={DASHBOARD}>
            The Pizza Club
          </Link>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to={DASHBOARD_ORDERS}>
              Ordenes
            </Link>

            <Link className="navbar-item" to={DASHBOARD_PRODUCTS}>
              Productos
            </Link>

            <Link className="navbar-item" to={DASHBOARD_EMPLOYEES}>
              Empleados
            </Link>

            <Link className="navbar-item" to={DASHBOARD_TABLES}>
              Mesas
            </Link>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">
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
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
