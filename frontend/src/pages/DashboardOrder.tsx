import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { Align, Table, Column } from "../components/Table";
import { Confirm } from "../components/Confirm";
import { Toolbar } from "../components/Toolbar";
import { fetchOrders, updateOrder } from "../actions/dashboardActions";
import { Order, statusMap } from "../types/order";
import dayjs from "dayjs";

type Props = DispatchProp<any> & {
  orders: Order[];
};

class DashboardOrdersPage extends Component<Props> {
  static defaultProps = {
    orders: [],
  };

  private columns: Column[] = [
    {
      key: "order",
      title: "#",
      align: Align.right,
      width: 50,
    },
    {
      key: "comment",
      title: "Comentario",
    },
    {
      key: "date",
      title: "Fecha",
      align: Align.center,
      width: 200,
      render: (order: Order) =>
        order.date ? dayjs(order.date).format("hh:mm DD/MM/YYYY") : "",
    },
    {
      key: "delivery_mode",
      title: "Tipo Envio",
      align: Align.center,
      width: 150,
    },
    {
      key: "delivery_address",
      title: "Direccion",
      render: (order: Order) => {
        const address = order["delivery_address"];

        return address?.id && <div>{address.address}</div>;
      },
    },
    {
      key: "status",
      title: "Estado",
      align: Align.center,
      width: 150,
      render: (order: Order) =>
        !!order.status && (statusMap[order.status] ?? ""),
    },
    {
      key: "actions",
      title: "Acciones",
      align: Align.center,
      width: 120,
      render: (order: Order) => (
        <div>
          <Confirm
            title="El pedido fue entregado?"
            okLabel="Si"
            onClick={this.handleDelivered(order.order)}
          >
            <button title="Entregado" className="button is-info mr-2">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </button>
          </Confirm>

          <Confirm
            title="El pedido fue cancelado?"
            okLabel="Si"
            onClick={this.handleCancel(order.order)}
          >
            <button title="Rechazado" className="button is-danger">
              <span className="icon">
                <i className="fas fa-times" />
              </span>
            </button>
          </Confirm>
        </div>
      ),
    },
  ];

  public componentDidMount() {
    this.props.dispatch(fetchOrders());
  }

  private handleCancel = (id: number) => () => {
    this.props.dispatch(updateOrder(id, { status: "cancel" }));
  };

  private handleDelivered = (id: number) => () => {
    this.props.dispatch(updateOrder(id, { status: "delivering" }));
  };

  public render() {
    const { orders } = this.props;

    return (
      <div>
        <Toolbar title="Ordenes"></Toolbar>

        <Table columns={this.columns} data={orders} dataKey="order" />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  orders: state.dashboard.orders,
});

export default connect(mapStateToProps)(DashboardOrdersPage);
