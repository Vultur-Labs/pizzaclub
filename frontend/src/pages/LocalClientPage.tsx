import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import lodash from "lodash";

// Import Types or Interfaces
import { Place } from "../types/place";
import { OrderTable, Table } from "../types/table";
// Import Components
import { Image, GoToButton } from "../components/Common";
import Menu from "../containers/Menu";
import { PriceItem, CartItem } from "../components/Cart";
//Import Actions
import { fetchTables } from "../actions/dashboardActions";
import { fetchOrderTable } from "../actions/staffActions";
// Import Getters
import { getOwnerData } from "../reducers/ownerReducer";
import { getOrderTables } from "../reducers/staffReducer";
import { getTables } from "../reducers/dashboardReducer";
// Import routers
import { LOCAL_CLIENT, LOCAL_CLIENT_ORDER, INDEX } from "../routes";

type Props = DispatchProp<any> & {
    ownerData: Place;
    orders: OrderTable[];
    tables: Table[];
    table: number;
}

class LocalClientPage extends Component<Props> {
    
    public componentDidMount() {
        this.props.dispatch(fetchTables());
        this.props.dispatch(fetchOrderTable());
    }

    public render(){
        const { ownerData, orders, tables, table } = this.props;
        const tableId = tables.find(t => t.number === table)?.id;

        return (
            <div>
                <section className="hero is-warning">
                <div className="hero-body py-0">
                    <div className="container has-text-centered">
                    <Image 
                        className="image header-logo"
                        src="/images/logo.png"
                        alt={ownerData.name}
                    />
                    </div>
                </div>
                </section>
                

                <div className="container px-2">
                    <div className="columns is-centered">
                        <div className="column mt-3">
                        <Switch>
                            <Route path={`${LOCAL_CLIENT_ORDER}/:tableId`} render={({ match }) => {
                                const order = orders.filter(({ table }) => 
                                (match.params.tableId === String(table.id)))[0];
                                
                                if (!order) return <Redirect to={INDEX}/>;
                                
                                return (
                                    <>
                                        {lodash.isEmpty(order.items)
                                        ?<p className="title has-text-centered py-4">No tienes consumos!!</p>
                                        :[order.items.map(item => (
                                            <CartItem
                                                key={item.id}
                                                product={item.product.product}
                                                size={item.product.size}
                                                presentation={item.product.presentation}
                                                quantity={item.quantity}
                                                subtotal={item.total}
                                            />)
                                        ),

                                        <PriceItem
                                            key="total"
                                            className={`field is-grouped has-text-weight-bold
                                                is-justify-content-space-between  my-4`}
                                            classItem="control is-size-4"
                                            text="Total"
                                            price={order.total}
                                        />]}

                                        <GoToButton
                                            path={`${LOCAL_CLIENT}/${order.table.number}`}
                                            className={`button is-warning is-fullwidth mt-2
                                                is-size-5 has-text-weight-bold`}
                                        >
                                            <span className="icon">
                                            <i className="fas fa-undo"></i>
                                            </span>
                                            <span>Volver</span>
                                        </GoToButton>
                                    </>
                                )
                            }
                            }/>

                            <Route exact path={`${LOCAL_CLIENT}/${table}`}>
                                <>
                                    <Menu interactive={false}/>
                                    <GoToButton
                                        path={`${LOCAL_CLIENT}/consumos/${tableId}`}
                                        className={`button is-info is-fullwidth mt-2
                                            is-size-5 has-text-weight-bold`}
                                    >
                                        <span className="icon">
                                        <i className="fas fa-undo"></i>
                                        </span>
                                        <span>Ver Consumos</span>
                                    </GoToButton>
                                </>
                            </Route>
                
                        </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: object) => ({
    ownerData: getOwnerData(state),
    orders: getOrderTables(state),
    tables: getTables(state)
});
  
export default connect(mapStateToProps, null)(LocalClientPage);
