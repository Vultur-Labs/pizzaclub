import React, { FC } from "react";

import { IconDelivered } from "./OrderComponents";
import { Confirm } from "./Confirm";
import {
  OrderTable,
  statusMapToIcon,
  statusMapToClassButton,
} from "../types/table";

type Props = {
  title: string;
  order: OrderTable;
  detailView?: (order: any) => void;
  add?: (order: any) => void;
  close?: (order: any) => void;
};

export const TableCard: FC<Props> = ({
  title,
  order,
  detailView,
  add,
  close,
}) => {
  const handleAction = (order: OrderTable, func: any) => () => {
    if (func && typeof func === "function") func(order);
  };
  // Create an of like status: (number of items)
  // Exclude delivered status
  const counter = order.items.reduce(
    (a, c) =>
      c.status === "delivered"
        ? { ...a }
        : a[c.status]
        ? { ...a, [c.status]: a[c.status] + 1 }
        : { ...a, [c.status]: 1 },
    {}
  );

  return (
    <div className="card mx-2 my-3 has-background-grey-lighter">
      <div className="card-content">
        <div className="content level">
          <div className="level-left">
            <div className="level-item">
              {/* Counter Icons for Status of Items */}
              {Object.keys(counter)
                .sort()
                .map((c) => (
                  <span
                    key={`${order.id}-${c}`}
                    className="is-flex is-align-items-center has-text-weight-bold"
                  >
                    <IconDelivered
                      icon={statusMapToIcon[c]}
                      className={statusMapToClassButton[c]}
                    />
                    <span className="ml-2">{counter[c]}</span>
                  </span>
                ))}
            </div>

            <div className="level-item has-text-centered">
              <p className="title">{title}</p>
            </div>
          </div>
          <div className="level-right">
            <p className="level-item">
              <strong>{`$ ${order.total}`}</strong>
            </p>
          </div>
        </div>
      </div>
      <footer className="card-footer buttons has-addons">
        <button
          className="card-footer-item button is-link"
          onClick={handleAction(order, detailView)}
        >
          Detalle
        </button>

        <button
          className="card-footer-item button is-success"
          onClick={handleAction(order, add)}
        >
          Agregar
        </button>

        <Confirm
          title={`Está seguro que quiere cerrar la Mesa ${order.table.number}?`}
          okLabel="Sí"
          onClick={handleAction(order, close)}
        >
          <button className="card-footer-item button is-danger">Cerrar</button>
        </Confirm>
      </footer>
    </div>
  );
};
