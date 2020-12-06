import React, { Component, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import {
//   faCheckSquare,
//   faClock,
//   faUtensils,
// } from "@fortawesome/free-solid-svg-icons";

// Import Types
import {
  OrderTable,
  TableItem,
  statusMap,
  statusMapToClassIcon,
  statusMapToIcon,
  statusMapToNext,
} from "../types/table";
// Import Components
import { PriceItem, CartItem } from "./Cart";
import { Confirm } from "./Confirm";
import { EditComment } from "./EditComment";

type DeliveredIconProps = {
  className?: string;
  icon: IconProp;
  onClick?: () => void;
};

export const IconDelivered: FC<DeliveredIconProps> = ({
  className = "",
  icon,
  onClick,
  ...props
}) => (
  <span {...props} className={className} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </span>
);

type PropsItem = {
  item: TableItem;
  changeStatus?: (status: string) => void;
  removeItem?: (item: TableItem) => void;
};

const TableItemInfo: FC<PropsItem> = ({ item, changeStatus, removeItem }) => {
  const { status } = item;
  const icon = (
    <IconDelivered
      className={statusMapToClassIcon[status]}
      icon={statusMapToIcon[status]}
      data-tooltip={statusMap[status]}
      onClick={() => changeStatus && changeStatus(statusMapToNext[status])}
    />
  );

  return (
    <div className="level is-mobile mt-2 is-align-content-baseline">
      <div className="level-left is-align-items-flex-start">
        <div className="level-item">{icon}</div>
        <div className="level-item">
          <CartItem
            product={item.product.product}
            size={item.product.size}
            presentation={item.product.presentation}
            quantity={item.quantity}
            subtotal={item.total}
          />
        </div>
      </div>
      <Confirm
        title={`Está seguro que quiere eliminar ?`}
        okLabel="Sí"
        onClick={() => removeItem && removeItem(item)}
      >
        <button
          className="button is-danger is-small has-tooltip-left"
          data-tooltip="Eliminar Item"
        >
          <span className="icon">
            <i className="fas fa-trash" />
          </span>
        </button>
      </Confirm>
    </div>
  );
};

type Props = {
  order: OrderTable;
  changeStatusItem: (id: number, status: string) => void;
  removeTableItem: (item: TableItem) => void;
  saveCommentOrder: (data: string) => void;
};

export class OrderShower extends Component<Props> {
  private handleStatusItem = (item: TableItem) => async (status: string) => {
    await this.props.changeStatusItem(item.id, status);
  };

  private handleRemoveItem = async (item: TableItem) => {
    await this.props.removeTableItem(item);
  };

  private handleSaveComment = async (data: string) => {
    await this.props.saveCommentOrder(data);
  };

  public render() {
    const { order } = this.props;
    return (
      <div>
        {order.items.map((i) => (
          <TableItemInfo
            key={i.id}
            item={i}
            changeStatus={this.handleStatusItem(i)}
            removeItem={this.handleRemoveItem}
          />
        ))}

        <PriceItem
          className={`field is-grouped has-text-weight-bold
                        is-justify-content-space-between  my-4`}
          classItem="control is-size-4"
          text="Total"
          price={order.total}
        />

        <EditComment
          label="Comentatios:"
          value={order.comment}
          onOk={this.handleSaveComment}
        />
      </div>
    );
  }
}
