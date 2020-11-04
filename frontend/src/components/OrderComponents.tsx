import React, { Component, FC } from "react";

// Import Types
import { OrderTable, TableItem } from "../types/table";
// Import Components
import { PriceItem, CartItem } from "./Cart";
import { Confirm } from "./Confirm";

type DeliveredIconProps = {
    className: string;
    classIcon: string;
    onClick: () => void;
}

const IconDelivered: FC<DeliveredIconProps> = ({
    className,
    classIcon,
    onClick,
    ...props
}) => (
    <span {...props} className={className} onClick={onClick} >
        <i className={classIcon}></i>
    </span>
)


type PropsItem = {
    item: TableItem;
    changeDelivered?: (status: boolean) => void;
    removeItem?: (item: TableItem) => void;
}

const TableItemInfo: FC<PropsItem> = ({ 
    item,
    changeDelivered,
    removeItem
}) => {

    const { is_delivered } = item;
    const icon = is_delivered
        ?(<IconDelivered 
            className="icon has-text-success has-tooltip-right"
            classIcon="fas fa-check-square"
            data-tooltip="Entregado"
            onClick={() => changeDelivered && changeDelivered(false)}/>)
        :(<IconDelivered 
            className="icon has-text-danger has-tooltip-right"
            classIcon="fas fa-times"
            data-tooltip="No Entregado"
            onClick={() => changeDelivered && changeDelivered(true)}
        />);
    
    return (
        <div className="level is-mobile mt-2 is-align-content-baseline">
            <div className="level-left is-align-items-flex-start">
                <div className="level-item">
                    {icon}
                </div>
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
                    data-tooltip="Eliminar Item">
                    <span className="icon">
                        <i className="fas fa-trash" />
                    </span>
                </button>
            </Confirm>

        </div>
    )
}

type Props = {
    order: OrderTable;
    changeDelivered: (id: number, status: boolean) => void;
    removeTableItem: (item: TableItem) => void;
};

export class OrderShower extends Component<Props> {

    private handleDelivered = (item: TableItem) => async (status: boolean) => {
        await this.props.changeDelivered(item.id, status);
    }

    private handleRemoveItem = async (item: TableItem) => {
        await this.props.removeTableItem(item);
    }

    public render(){
        const { order } = this.props;
        return (
            <div>
                {order.items.map(i => (
                    <TableItemInfo 
                        key={i.id}
                        item={i}
                        changeDelivered={this.handleDelivered(i)}
                        removeItem={this.handleRemoveItem}
                    />
                    )
                )}

                <PriceItem 
                    className={`field is-grouped has-text-weight-bold
                        is-justify-content-space-between  my-4`}
                    classItem="control is-size-4"
                    text="Total"
                    price={order.total}/>
            </div>
        )
    };
}

