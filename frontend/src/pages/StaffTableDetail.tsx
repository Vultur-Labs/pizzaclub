import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Import Components
import { GoToButton } from "../components/Common";
import { Confirm } from "../components/Confirm";
import { OrderShower } from "../components/OrderComponents";
//Import Actions
import {
  closeTable,
  setDeliveredTableItem,
  removeTableItem,
} from "../actions/staffActions";
//Import Types
import { OrderTable, TableItem } from "../types/table";
// Import Routes
import { STAFF_ADD } from "../routes";

type Props = {
  order: OrderTable;
  path?: string;
};

export const StaffTableDetail: FC<Props> = ({ order, path = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    order ?? history.push(path);
  }, [history, order, path]);

  const handleCloseTable = (order: OrderTable) => () => {
    dispatch(closeTable(order.id));
  };

  const handleDeliveredTableItem = (item_id: number, is_delivered: boolean) => {
    dispatch(setDeliveredTableItem(item_id, is_delivered));
  };

  const handleRemoveTableItem = (item: TableItem) => {
    dispatch(removeTableItem(item.order, item.id));
  };

  if (!order) return <div>Loading...</div>;
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <OrderShower
            order={order}
            changeDelivered={handleDeliveredTableItem}
            removeTableItem={handleRemoveTableItem}
          />

          <GoToButton
            path={`${path + STAFF_ADD}/${order.id}`}
            className={`button is-success is-fullwidth mt-2
                        is-size-5 has-text-weight-bold`}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Agregar Consumos</span>
          </GoToButton>

          <Confirm
            title={`Está seguro que quiere cerrar la Mesa 
                                ${order.table.number}?`}
            okLabel="Sí"
            onClick={handleCloseTable(order)}
          >
            <button
              className={`button is-danger is-fullwidth mt-2
                            is-size-5 has-text-weight-bold`}
            >
              Cerrar Mesa
            </button>
          </Confirm>

          <GoToButton
            path={path}
            className={`button is-warning is-fullwidth mt-2
                            is-size-5 has-text-weight-bold`}
          >
            <span className="icon">
              <i className="fas fa-undo"></i>
            </span>
            <span>Volver</span>
          </GoToButton>
        </div>
      </div>
    </div>
  );
};
