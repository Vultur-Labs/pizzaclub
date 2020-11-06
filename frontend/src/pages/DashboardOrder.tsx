import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import dayjs from "dayjs";
import lodash from "lodash";

//Import Components
import { Align, Table, Column } from "../components/Table";
import { Toolbar } from "../components/Toolbar";
import { SelectOption } from "../components/SelectOption";
import { EditData } from "../components/EditData";
import { CheckEdit, CancelEdit, AllowEdit} from "../components/Common";
import { Pagination } from "../components/Pagination";
import { Loader } from "../components/Common";
// Import Actions
import { fetchOrders, updateOrder } from "../actions/dashboardActions";
// Import Getters
import { 
  getOrders,
  getOrdersPages,
  getOrdersCurrent,
  getOrdersNext,
  getOrdersPrevious
} from "../reducers/dashboardReducer";
// Import Types
import { Order, statusMap, statusStyleMap } from "../types/order";
import { Item } from "../types/item";

type Props = DispatchProp<any> & {
  orders: Order[];
  pages: number;
  current: number;
  next: number | null;
  previous: number | null;
};

class DashboardOrdersPage extends Component<Props> {
  static defaultProps = {
    orders: [],
  };

  public state = {
    loading: false,
  }

  private columns: Column[] = [
    {
      key: "order",
      title: "#",
      align: Align.right,
      width: 50,
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
      key: "items",
      title: "Productos",
      align: Align.left,
      width: 200,
      render: (order: Order) => (
        <ul>
          {order.items.map((i: Item)=>{
            const {total, quantity, product: { product, size, presentation }} = i;
            const name = `${product.types.name}
                          ${product.name}
                          ${size ? ` - ${size}`: ""}
                          ${presentation ? ` - ${presentation}`:""}`
            return (
              <li key={i.id}>{`${quantity} x ${name} ($${total})`}</li>
            )
            })
          }
        </ul>
      )
    },
    {
      key: "delivery_mode",
      title: "Tipo Envío",
      align: Align.center,
      width: 150,
      render: (order: Order) => {
        const mode = order["delivery_mode"]
        if ( mode === "local") return `${mode}-Mesa ${order.table}`;
        return mode;
      }
    },
    {
      key: "delivery_address",
      title: "Dirección",
      align: Align.center,
      render: (order: Order) => {
        const address = order["delivery_address"];

        return (address?.id && <div>{address.address}</div>) || "-------------";
      },
    },
    {
      key: "status",
      title: "Estado",
      align: Align.center,
      width: 150,
      render: (order: Order) =>{
        return <SelectOption
          dataKey="status"
          options={Object.entries(statusMap)} 
          value={order.status}
          stylesClass={statusStyleMap}
          onChange={this.handleUpdate(order.order)}
        />}
    },
    {
      key: "comment",
      title: "Comentario",
      render: (order: Order) => 
        <EditData 
          data={order.comment ?? ""}
          dataKey="comment"
          onOk={this.handleUpdate(order.order)}
          input={<textarea className="textarea" />}
          btnEdit={<AllowEdit />}
          btnCheck={<CheckEdit />}
          btnCancel={<CancelEdit />}
          />
    },
    {
      key: "total",
      title: "Total",
      align: Align.center,
      width: 120,
      render: (order: Order) => `$${order.total}`
    },
  ];

  public componentDidMount() {
    this.props.dispatch(fetchOrders())
  }

  private handleUpdate = (id: number) => async (data: any) => {
    const res = await this.props.dispatch(updateOrder(id, data));
    return lodash.isEmpty(res);
  };
  
  private handleChangePage = async (page: number) => {
    if (page !== this.props.current) {
      this.setState({loading: true});
      await this.props.dispatch(fetchOrders(page));
      this.setState({loading: false});
    }
  }

  public render() {
    const { orders, current, next, previous, pages } = this.props;

    if (this.state.loading) 
      return (
        <div className="is-flex is-justify-content-center">
          <Loader className="image is-128x128" alt="Cargando ..."/>
        </div>
      );

    return (
      <div>
        <Toolbar title="Ordenes">
          <Pagination 
            {...{current, next, previous, pages}} 
            changePage={this.handleChangePage}
          />
        </Toolbar>
        
        <Table columns={this.columns} data={orders} dataKey="order" />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  orders: getOrders(state),
  pages: getOrdersPages(state),
  current: getOrdersCurrent(state),
  next: getOrdersNext(state),
  previous: getOrdersPrevious(state)
});

export default connect(mapStateToProps)(DashboardOrdersPage);
