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
  updateProduct,
  fetchProducts,
  fetchTypes,
} from "../actions/dashboardActions";
import { Product } from "../types/product";
import { ProductType } from "../types/product-type";
import { Place } from "../types/place";

type Props = DispatchProp<any> & {
  place: Place;
  products: Product[];
  types: ProductType[];
};

class DashboardProductsPage extends Component<Props> {
  static defaultProps = {
    products: [],
    types: [],
  };

  private columns: Column[] = [
    {
      key: "name",
      title: "Nombre",
      width: 300,
    },
    {
      key: "types",
      title: "Tipo",
      width: 200,
      render: (product: Product) =>
        this.props.types.find((type) => type.id === product.types)?.name ?? "",
    },
    {
      key: "description",
      title: "Descripcion",
    },
    {
      key: "order_n",
      title: "N° Orden",
      align: Align.center,
    },
    {
      key: "actions",
      title: "Acciones",
      align: Align.center,
      width: 120,
      render: (product: Product) => (
        <div>
          <ModalTrigger
            button={
              <button className="button is-info mr-2">
                <span className="icon">
                  <i className="fas fa-edit" />
                </span>
              </button>
            }
            modal={
              <EditProductModal
                product={product}
                types={this.props.types}
                onOk={this.handleEditProduct}
              />
            }
          />

          <Confirm
            title={`Está seguro que quiere eliminar ${product.name}?`}
            okLabel="Sí"
            onClick={this.handleDeleteProduct(product)}
          >
            <button className="button is-danger">
              <span className="icon">
                <i className="fas fa-trash" />
              </span>
            </button>
          </Confirm>
        </div>
      ),
    },
  ];

  public componentDidMount() {
    this.props.dispatch(fetchProducts());
    this.props.dispatch(fetchTypes());
  }

  private handleEditProduct = (product: Product) => {
    product.place = this.props.place.id;
    this.props.dispatch(updateProduct(product.id, product));
  };

  private handleSaveProduct = (product: Product) => {
    product.place = this.props.place.id;
    this.props.dispatch(createProduct(product));
  };

  private handleDeleteProduct = (product: Product) => () => {
    this.props.dispatch(deleteProduct(product.id));
  };

  public render() {
    const { products, types } = this.props;

    return (
      <div>
        <Toolbar title="Productos">
          <ModalTrigger
            button={
              <button className="button is-info">
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
                <span>Crear</span>
              </button>
            }
            modal={
              <EditProductModal types={types} onOk={this.handleSaveProduct} />
            }
          />
        </Toolbar>

        <Table columns={this.columns} data={products} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  place: state.dashboard.place,
  products: state.dashboard.products,
  types: state.dashboard.types,
});

export default connect(mapStateToProps)(DashboardProductsPage);
