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
  fetchProducts,
  fetchTypes,
} from "../actions/dashboardActions";
import { Product } from "../types/product";
import { ProductType } from "../types/product-type";

type Props = DispatchProp<any> & {
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
        this.props.types.find((type) => type.id === product.types)?.name,
    },
    {
      key: "description",
      title: "Descripcion",
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
                onSubmit={this.handleEditProduct}
              />
            }
          />

          <Confirm
            title="Esta seguro?"
            okLabel="Si"
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
    this.props.dispatch(editProduct(product.id, product));
  };

  private handleSaveProduct = (product: Product) => {
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
              <EditProductModal
                types={types}
                onSubmit={this.handleSaveProduct}
              />
            }
          />
        </Toolbar>

        <Table columns={this.columns} data={products} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  products: state.dashboard.products,
  types: state.dashboard.types,
});

export default connect(mapStateToProps)(DashboardProductsPage);
