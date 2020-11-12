import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";

// Import Components
import { Align, Table, Column } from "../components/Table";
import { Confirm } from "../components/Confirm";
import { Toolbar } from "../components/Toolbar";
import { ModalTrigger } from "../components/ModalTrigger";
import { EditTableModal } from "../components/modals/EditTable";
import { Loader } from "../components/Common";
// Import Actions
import {
  fetchTables,
  createTable,
  updateTable,
  deleteTable,
} from "../actions/dashboardActions";
// Import Types
import { Table as TableLocal } from "../types/table";

type Props = DispatchProp<any> & {
  tables: TableLocal[];
  owner_id: number;
};

class DashboardTables extends Component<Props> {
  static defaultProps = {
    tables: [],
  };

  public state = {
    loading: false,
  };

  private columns: Column[] = [
    {
      key: "id",
      title: "#",
      align: Align.right,
      width: 50,
    },
    {
      key: "number",
      title: "Mesa",
      align: Align.center,
      width: 150,
      render: (table: TableLocal) => `Mesa ${table.number}`,
    },
    {
      key: "is_open",
      title: "Estado",
      align: Align.center,
      width: 150,
      render: (table: TableLocal) => (table.is_open ? "Abierta" : "Cerrada"),
    },
    {
      key: "actions",
      title: "Acciones",
      align: Align.center,
      width: 120,
      render: (table: TableLocal) => (
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
              <EditTableModal
                table={table}
                onOk={this.handleUpdateTable(table.id)}
              />
            }
          />

          <Confirm
            title={`Está seguro que quiere eliminar la Mesa ${table.number}?`}
            okLabel="Sí"
            onClick={this.handleDeleteTable(table)}
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

  public async componentDidMount() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      await this.props.dispatch(fetchTables());
      this.setState({ loading: false });
    }
  }

  private handleSaveTable = (owner: number) => (data: any) => {
    this.props.dispatch(createTable({ owner, ...data }));
  };

  private handleUpdateTable = (id: number) => (data: any) => {
    this.props.dispatch(updateTable(id, data));
  };

  private handleDeleteTable = (table: TableLocal) => async () => {
    this.props.dispatch(deleteTable(table.id));
  };

  public render() {
    const { tables, owner_id } = this.props;

    if (this.state.loading)
      return (
        <div className="is-flex is-justify-content-center">
          <Loader className="image is-128x128" alt="Cargando ..." />
        </div>
      );

    return (
      <div>
        <Toolbar title="Empleados">
          <ModalTrigger
            button={
              <button className="button is-info">
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
                <span>Nueva Mesa</span>
              </button>
            }
            modal={<EditTableModal onOk={this.handleSaveTable(owner_id)} />}
          />
        </Toolbar>
        <Table columns={this.columns} data={tables} dataKey="tables" />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  tables: state.dashboard.tables,
  owner_id: state.dashboard.place.id,
});

export default connect(mapStateToProps)(DashboardTables);
