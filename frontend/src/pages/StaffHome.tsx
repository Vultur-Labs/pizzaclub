import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";

// Import Types or Interfaces
import { Place } from "../types/place";
// Import Components
import { Image } from "../components/Common";
import { SelectOption } from "../components/SelectOption";
import Menu from "../containers/Menu";
//Import Actions
import { logout } from "../actions/dashboardActions";
// Import Getters
import { getOwnerData } from "../reducers/ownerReducer";

type Props = DispatchProp<any> & {
  ownerData: Place;
}


class StaffHomePage extends Component<Props> {
  
  private handleLogout = () => this.props.dispatch(logout());

  public render() {
    const { ownerData } = this.props;
    const options = Array
      .from(Array(ownerData.tables).keys())
      .map(x => [++x, `Mesa ${x}`]);
      
    return (
      <div>
        <div className="field">
                <p className="control">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={this.handleLogout}
                  >
                    <strong>Salir</strong>
                  </button>
                </p>
              </div>
        <div className="header-place">
          <Image 
            className="image header-logo"
            src="/images/logo.png"
            alt={ownerData.name}
            />
        </div>
        <SelectOption 
          value="-----"
          options={options}
          onChange={d => {console.log(d); return true}}/>
        <Menu interactive={true}/>
      </div>
    );
  }
}


const mapStateToProps = (state: object) => ({
  ownerData: getOwnerData(state),
});

export default connect(mapStateToProps, null)(StaffHomePage);
