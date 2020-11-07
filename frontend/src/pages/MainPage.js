import React, { Component } from "react";
import { Logo, ButtonLink, GoToButton } from "../components/Common";
import { MENU, DELIVERY, TAKEAWAY, DASHBOARD } from "../routes";
import logo from "../images/logo.png";

class MainPage extends Component {
  render() {
    return (
      <div className="mainpage">
        <Logo
          className="image main-logo"
          classImg="is-rounded"
          image={logo}
          alt="The Pizza Club"
        />
        <GoToButton className="has-text-warning btn-dashboard" path={DASHBOARD}>
          <span className="icon is-medium">
            <i className="fa fa-cog"></i>
          </span>
        </GoToButton>
        <div className="main-menu">
          <ButtonLink
            className="button is-warning is-medium is-active main-option"
            path={DELIVERY}
          >
            <span className="icon main-option--icon">
              <i className="fas fa-motorcycle"></i>
            </span>
            <span className="main-option--text">delivery</span>
          </ButtonLink>
          <ButtonLink
            className="button is-warning is-medium is-active main-option"
            path={TAKEAWAY}
          >
            <span className="icon main-option--icon">
              <i className="fas fa-store"></i>
            </span>
            <span className="main-option--text">takeaway</span>
          </ButtonLink>
          <ButtonLink
            className="button is-warning is-medium is-active main-option"
            path={MENU}
          >
            <span className="icon main-option--icon">
              <i className="fas fa-book-open"></i>
            </span>
            <span className="main-option--text">menú</span>
          </ButtonLink>
        </div>
      </div>
    );
  }
}

export default MainPage;
