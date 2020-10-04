import React, { Component } from "react";
import { connect } from "react-redux";

// Import Actions
import { setDelivery } from "../actions/actionsCart";
// Import Containers
import Menu from "../containers/Menu";
// Import Components
import { GoToButton } from "../components/Common";
import { GoToCart } from "../components/Cart";
import { PlaceHeader } from "../components/Place";

class DeliveryPage extends Component {

  componentDidMount() {
    const { mode, setDelivery } = this.props;
    setDelivery(mode, {id: 0, cost: 0.0});
  }

  render() {
    const { goBack, goCart, interactive } = this.props;
    return (
      <div className="menupage">
        <GoToButton path={goBack} className="back-btn">
          <span className="icon">
            <i className="fas fa-angle-left"></i>
          </span>
        </GoToButton>
        <PlaceHeader />
        <Menu interactive={interactive} />
        <GoToCart
          path={goCart}
          className="gotocart"
          classBtn="button is-primary gotocart-btn"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDelivery: (mode, shipping) =>
      dispatch(setDelivery(mode, shipping)),
  };
};

export default connect(null, mapDispatchToProps)(DeliveryPage);
