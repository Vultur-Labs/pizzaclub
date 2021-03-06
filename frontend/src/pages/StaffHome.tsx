import React, { Component, FC, useEffect } from "react";
import { connect, DispatchProp, useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Import Types or Interfaces
import { Place } from "../types/place";
import { OrderTable } from "../types/table";
// Import Components
import { Image, LogoutButton, GoToButton } from "../components/Common";
import Menu from "../containers/Menu";
import StaffTableManager from "./StaffTableManager";
import { StaffTableDetail } from "./StaffTableDetail";
import StaffTableMenu from "./StaffTableMenu";
//Import Actions
import { logout, fetchTables } from "../actions/dashboardActions";
import { fetchOrderTable } from "../actions/staffActions";
// Import Getters
import { getOwnerData } from "../reducers/ownerReducer";
import { getOrderTables } from "../reducers/staffReducer";
// import Routes
import { STAFF_HOME, STAFF_ADD, STAFF_TABLE, STAFF_MENU } from "../routes";
import logo from "../images/logo.png";

type TableManagerProps = {
  path?: string;
};

export const TableManager: FC<TableManagerProps> = ({ path = "" }) => {
  const dispatch = useDispatch();
  const orders: OrderTable[] = useSelector((state: any) =>
    getOrderTables(state)
  );

  useEffect(() => {
    dispatch(fetchOrderTable());
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div className="container px-2">
      <div className="columns is-centered">
        <div className="column">
          <Switch>
            <Route exact path={path}>
              <StaffTableManager path={path} />
            </Route>

            <Route
              path={path + STAFF_MENU}
              render={() => (
                <>
                  <Menu interactive={false} />
                  <GoToButton
                    path={path}
                    className="button is-warning is-fullwidth"
                  >
                    <span className="icon">
                      <i className="fas fa-undo"></i>
                    </span>
                    <span>Volver</span>
                  </GoToButton>
                </>
              )}
            />

            <Route
              path={`${path + STAFF_ADD}/:orderId`}
              render={({ match }) => {
                const order = orders.filter(
                  ({ id }) => match.params.orderId === String(id)
                )[0];
                return <StaffTableMenu order={order} path={path} />;
              }}
            />

            <Route
              path={`${path + STAFF_TABLE}/:orderId`}
              render={({ match }) => {
                const order = orders.filter(
                  ({ id }) => match.params.orderId === String(id)
                )[0];
                return <StaffTableDetail order={order} path={path} />;
              }}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

type Props = DispatchProp<any> & {
  ownerData: Place;
  // orders: OrderTable[];
};

class StaffHomePage extends Component<Props> {
  // public componentDidMount() {
  //   this.props.dispatch(fetchTables());
  //   this.props.dispatch(fetchOrderTable());
  // }

  private handleLogout = () => this.props.dispatch(logout());

  public render() {
    // const { ownerData, orders } = this.props;
    const { ownerData } = this.props;
    return (
      <div>
        <section className="hero is-warning">
          <div className="hero-body py-0">
            <div className="container has-text-centered">
              <Image
                className="image header-logo"
                src={logo}
                alt={ownerData.name}
              />
              <LogoutButton
                className="mt-1 btn-logout"
                onClick={this.handleLogout}
              />
            </div>
          </div>
        </section>

        <TableManager path={STAFF_HOME} />

        {/* <div className="container px-2">
          <div className="columns is-centered">
            <div className="column">
            <Switch>

              <Route exact path={STAFF_HOME}>
                <StaffTableManager />
              </Route>

              <Route path={STAFF_MENU} render={() =>(
                  <>
                    <Menu interactive={false}/>
                    <GoToButton
                      path={STAFF_HOME}
                      className="button is-warning is-fullwidth"
                    >
                      <span className="icon">
                      <i className="fas fa-undo"></i>
                      </span>
                      <span>Volver</span>
                    </GoToButton>
                  </>
                )
              }/>

              <Route path={`${STAFF_ADD}/:orderId`} render={({ match }) => {
                const order = orders.filter(({ id }) => 
                  (match.params.orderId === String(id)))[0];
                return <StaffTableMenu order={order}/>
               }
              }/>

              <Route path={`${STAFF_TABLE}/:orderId`} render={({ match }) => {
                const order = orders.filter(({ id }) => 
                  (match.params.orderId === String(id)))[0];
                return <StaffTableDetail order={order}/>
               }
              }/>

            </Switch>
          </div>
        </div>
      </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state: object) => ({
  ownerData: getOwnerData(state),
  // orders: getOrderTables(state),
});

export default connect(mapStateToProps, null)(StaffHomePage);
