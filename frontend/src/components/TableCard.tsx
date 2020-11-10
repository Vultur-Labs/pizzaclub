import React, { FC } from "react";

import { Confirm } from "./Confirm";
import { OrderTable } from "../types/table";

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

  return (
    <div className="card mx-2 my-3 has-background-grey-lighter">
      <div className="card-content">
        <div className="content level">
          <div className="level-left">
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
