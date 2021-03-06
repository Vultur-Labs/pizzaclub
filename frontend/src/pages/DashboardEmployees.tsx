import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";

//Import Components
import { Align, Table, Column } from "../components/Table";
import { Confirm } from "../components/Confirm";
import { Toolbar } from "../components/Toolbar";
import { ModalTrigger } from "../components/ModalTrigger";
import { EditEmployeeModal } from "../components/modals/EditEmployee";
import { Loader } from "../components/Common";
// Import Actions
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../actions/dashboardActions";
//Import Getters
import { getEmployees } from "../reducers/dashboardReducer";
import { Employee } from "../types/employee";

type Props = DispatchProp<any> & {
  employees: Employee[];
  owner_id: number;
};

class DashboardEmployeesPage extends Component<Props> {
  static defaultProps = {
    employees: [],
  };

  public state = {
    loading: false,
  };

  private columns: Column[] = [
    {
      key: "user.id",
      title: "#",
      align: Align.right,
      width: 50,
    },
    {
      key: "user.username",
      title: "Usuario",
      align: Align.center,
      width: 150,
    },
    {
      key: "full_name",
      title: "Nombre y Apellido",
      align: Align.center,
      width: 150,
      render: (employee: Employee) =>
        (employee.user.first_name ?? "") +
        " " +
        (employee.user.last_name ?? ""),
    },
    {
      key: "user.email",
      title: "Correo Electrónico",
      align: Align.center,
      width: 150,
    },
    {
      key: "phone",
      title: "Telefono",
      align: Align.center,
      width: 150,
    },
    {
      key: "dni",
      title: "DNI",
      align: Align.center,
      width: 100,
    },
    {
      key: "actions",
      title: "Acciones",
      align: Align.center,
      width: 120,
      render: (employee: Employee) => (
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
              <EditEmployeeModal
                employee={employee}
                onOk={this.handleEditEmployee}
              />
            }
          />

          <Confirm
            title={`Está seguro que quiere eliminar a ${employee.user.username}?`}
            okLabel="Sí"
            onClick={this.handleDeleteEmployee(employee)}
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
      await this.props.dispatch(fetchEmployees());
      this.setState({ loading: false });
    }
  }

  private handleSaveEmployee = (data: any) => {
    this.props.dispatch(createEmployee(data));
  };

  private handleEditEmployee = (employee: Employee) => {
    this.props.dispatch(updateEmployee(employee.user.id, employee));
  };

  private handleDeleteEmployee = (employee: Employee) => () => {
    this.props.dispatch(deleteEmployee(employee.user.id));
  };

  public render() {
    const { employees } = this.props;

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
                <span>Nuevo Empleado</span>
              </button>
            }
            modal={<EditEmployeeModal onOk={this.handleSaveEmployee} />}
          />
        </Toolbar>
        <Table columns={this.columns} data={employees} dataKey="employees" />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  employees: getEmployees(state),
  owner_id: state.dashboard.place.id,
});

export default connect(mapStateToProps)(DashboardEmployeesPage);
