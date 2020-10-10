import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { Align, Table, Column } from "../components/Table";
import { ModalTrigger } from "../components/ModalTrigger";
import { Confirm } from "../components/Confirm";
import { Toolbar } from "../components/Toolbar";
import { EditProductModal } from "../components/modals/EditProduct";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchOrders,
} from "../actions/dashboardActions";
import { Product } from "../types/product";
import { Order } from "../types/order";
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
    },
    {
      key: "status",
      title: "Estado",
      align: Align.center,
      width: 150,
    },
    {
      key: "actions",
      title: "Acciones",
      align: Align.center,
      width: 120,
      render: () => (
        <div>
          <Confirm title="Esta seguro?" okLabel="Si" onClick={() => {}}>
            <button className="button is-info mr-2">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </button>
          </Confirm>

          <Confirm title="Esta seguro?" okLabel="Si" onClick={() => {}}>
            <button className="button is-danger">
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

  private handleEditProduct = (product: Product) => {
    this.props.dispatch(editProduct(product.id, product));
  };

  private handleSaveProduct = (product: Product) => {
    this.props.dispatch(createProduct(product));
  };

  private handleDeleteProduct = (product: Product) => () => {
    this.props.dispatch(deleteProduct(product.id));
  };

  public render() {
    const { orders } = this.props;

    console.log({ orders });

    return (
      <div>
        <Toolbar title="Ordenes"></Toolbar>

        <Table columns={this.columns} data={orders} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  orders: state.dashboard.orders,
});

export default connect(mapStateToProps)(DashboardOrdersPage);
