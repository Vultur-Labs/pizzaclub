import React, { FC, useState } from "react";
import { useDispatch, useSelector} from "react-redux";

// Import Components
import Menu from "../containers/Menu";
import  { GoToButton } from "../components/Common";
//Import Actions
import { addTableItem } from "../actions/staffActions";
import { emptyCart } from "../actions/actionsCart";
//Import Getters
import { getCartItems, getSubtotalCart } from "../reducers/cartReducer";
//Import Types
import { OrderTable } from "../types/table";
// Import Routes
import { STAFF_TABLE } from "../routes";

type Props = {
  order: OrderTable;
};

const StaffTableMenu: FC<Props> = ({ order }) => {
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const items: any[] = useSelector((state: any) => getCartItems(state));
    const subtotal: number = useSelector((state: any) => getSubtotalCart(state));

    const handleEmptyCart = () => dispatch(emptyCart())

    async function handleAddTableItems () {
        // Set Loading as true
        setLoading(true);
        // Create data
        const data = items.map(({
            quantity,
            size,
            presentation,
            product: { id }
        }) =>({
            order: order.id,
            product: id, 
            size,
            presentation,
            quantity
        }));
        //Dispatch addTableItem
        await dispatch(addTableItem(data));
        await dispatch(emptyCart());
        setLoading(false);
    }

    return (
        <>
            <Menu interactive={true}/>
            
            <div className="field has-addons">
                <p className="control is-expanded">
                <button className={`button is-success is-fullwidth 
                    has-text-weight-bold is-size-5 ${loading?"is-loading":null}`}
                    onClick={handleAddTableItems}
                >
                    <span className="icon">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span className="mx-2">Agregar</span>
                    <span>{`$ ${subtotal}`}</span>
                </button>
                </p>
                <p className="control">
                <button 
                    className="button is-danger is-size-5 has-tooltip-arrow" 
                    data-tooltip="Vaciar"
                    onClick={handleEmptyCart}
                >
                    <span className="icon">
                        <i className="fas fa-trash"></i>
                    </span>
                </button>
                </p>
            </div>

            <GoToButton 
                path={`${STAFF_TABLE}/${order.id}`}
                className="button is-warning is-fullwidth is-size-5 has-text-weight-bold"
            >
                <span className="icon">
                    <i className="fas fa-undo"></i>
                </span>
                <span>Volver</span>
            </GoToButton>
        </>
    );
};

export default StaffTableMenu;