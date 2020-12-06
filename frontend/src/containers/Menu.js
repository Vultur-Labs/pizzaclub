import React, { Component } from "react";
import { connect } from "react-redux";

// Import Actions
import {
  addCartItem,
  removeCartItem,
  emptyCart,
  plusOneQuantityItem,
  minusOneQuantityItem,
} from "../actions/actionsCart";
//Import getters
import { getTypesData, getProductsData } from "../reducers/showcaseReducer";
import { getCartItems } from "../reducers/cartReducer";
// Import Components
import { SearchProduct } from "../components/Common";
import { TypeProduct, Product, SubTypeProduct } from "../components/Products";

class Menu extends Component {
  state = {
    inputSearch: "",
  };

  _handleChange = (e) =>
    this.setState({ inputSearch: e.target.value.trimStart() });

  _resetInput = () => this.setState({ inputSearch: "" });

  render() {
    const { types, products, interactive, cartItems, local } = this.props;
    const { addToCart, removeToCart, plusQuantity, minusQuantity } = this.props;
    const { inputSearch } = this.state;
    return (
      <div className="menu">
        <div style={{ paddingBottom: 55 }}>
          <SearchProduct
            value={inputSearch}
            handleChange={this._handleChange}
            resetInput={this._resetInput}
          />
          {types.map((t) => {
            // If local is false, no show the types only_local
            if (!local && t.only_local) return null;
            // Get the product for the type and match the search bar
            let prod = products.filter(
              (p) =>
                p.types.id === t.id &&
                p.name.includes(inputSearch.trimEnd().toLowerCase())
            );

            return (
              <TypeProduct key={t.id} id={t.id} name={t.name}>
                {/* Pass the subtypes and  product as children */}
                {!!t.subtype.length
                  ? t.subtype.map((s) => (
                      <SubTypeProduct key={s.id} name={s.name} id={s.id}>
                        {prod.map((p) => {
                          //Pass the item of product if there is in the cart
                          if (p.subtype !== s.id) return null;
                          let item = cartItems.filter(
                            (i) => i.product.id === p.id
                          );
                          return (
                            <Product
                              key={p.id}
                              interactive={interactive}
                              data={p}
                              item={item}
                              {...{
                                addToCart,
                                removeToCart,
                                plusQuantity,
                                minusQuantity,
                              }}
                            />
                          );
                        })}
                      </SubTypeProduct>
                    ))
                  : prod.map((p) => {
                      //Pass the item of product if there is in the cart
                      let item = cartItems.filter((i) => i.product.id === p.id);
                      return (
                        <Product
                          key={p.id}
                          interactive={interactive}
                          data={p}
                          item={item}
                          {...{
                            addToCart,
                            removeToCart,
                            plusQuantity,
                            minusQuantity,
                          }}
                        />
                      );
                    })}
              </TypeProduct>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    types: getTypesData(state),
    products: getProductsData(state),
    cartItems: getCartItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addCartItem(item)),
    removeToCart: (id) => dispatch(removeCartItem(id)),
    plusQuantity: (id) => dispatch(plusOneQuantityItem(id)),
    minusQuantity: (id) => dispatch(minusOneQuantityItem(id)),
    emptyCart: () => dispatch(emptyCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
