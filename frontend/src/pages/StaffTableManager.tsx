import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import lodash from "lodash";

// Import Components
import { SelectWithAddon } from "../components/SelectWithAddon";
import { TableCard } from "../components/TableCard";
//Import Actions
import { fetchTables } from "../actions/dashboardActions";
import {
  openTable,
  closeTable
} from "../actions/staffActions";
//Import Getters
import { getTables, getAccount } from "../reducers/dashboardReducer";
import { getOrderTables } from "../reducers/staffReducer";
import { getOwnerData } from "../reducers/ownerReducer";
//Import Types
import { Table, OrderTable } from "../types/table";
import { Place } from "../types/place";
import { Account } from "../types/account";
// Import Routes
import { STAFF_ADD, STAFF_TABLE } from "../routes";

type Props = DispatchProp<any> & RouteComponentProps & {
  tables: Table[];
  orders: OrderTable[];
  owner: Place;
  employee: Account;
  path?: string;
};

class StaffManagerPage extends Component<Props> {
  static defaultProps = {
    tables: [],
    orders: [],
    path: "",
  };

  public componentDidMount() {
    this.props.dispatch(fetchTables());
  }

  private handleOpenTable = (
    owner: Place,
    employee: Account 
    ) => (data: Record<string, number>) => (
      this.props.dispatch(openTable(owner.id, data.data, employee.id))
    )

  private handleCloseTable = (order: OrderTable) => {
    this.props.dispatch(closeTable(order.id));
  }

  private handleGoToAddItem = (order: OrderTable) => {
    const { path } = this.props;
    this.props.history.push(`${path + STAFF_ADD}/${order.id}`);
  }

  private handleDetailTable = (order: OrderTable) => {
    const { path } = this.props;
    this.props.history.push(`${path + STAFF_TABLE}/${order.id}`);
  }

  public render() {
    const { tables, orders, owner,  employee } = this.props;
    const options = tables
        .filter(({ is_open }) => !is_open)
        .map(({id, number}) => ({value: id, label: `Mesa ${number}`}));

    return (
      <div className="mt-2">
        <SelectWithAddon
          options={options}
          onOk={this.handleOpenTable(owner, employee)}
        />
        <h1>Mesas Abiertas</h1>
        {
          lodash.isEmpty(orders)
          ? <p>No hay Mesas Abiertas</p>
          :orders.map(o => (
            <TableCard 
              key={o.id}
              title={`Mesa ${o.table.number}`}
              order={o}
              detailView={this.handleDetailTable}
              add={this.handleGoToAddItem}
              close={this.handleCloseTable}
              />
            )
          )
        }
      </div>
    );
  };
}

const mapStateToProps = (state: any) => ({
  tables: getTables(state),
  orders: getOrderTables(state),
  owner: getOwnerData(state),
  employee: getAccount(state)
});

export default withRouter(connect(mapStateToProps)(StaffManagerPage));

