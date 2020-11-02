import React from "react";
// import { useStoreContext } from "../../utils/GlobalState";
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

import { idbPromise } from "../../utils/helpers";

//REDUX IMPORTS
import { useDispatch } from 'react-redux';
//REDUX ACTIONS
import {
  removeFromCart,
  updateCartQuantity
} from '../../actions';


const CartItem = (props) => {
   const { item } = props;

  // const [, dispatch] = useStoreContext();

const dispatchREDUX = useDispatch();

const removeFromCart = (item) => {
  // dispatch({
  //   type: REMOVE_FROM_CART,
  //   _id: item._id,
  // });
  idbPromise("cart", "delete", { ...item });
};

  const onChange = (e) => {
    const value = e.target.value;

   if (value === "0") {
    //  dispatch({
    //    type: REMOVE_FROM_CART,
    //    _id: item._id,
    //  });
      dispatchREDUX(removeFromCart(item._id));

     idbPromise("cart", "delete", { ...item });
   } else {
    //  dispatch({
    //    type: UPDATE_CART_QUANTITY,
    //    _id: item._id,
    //    purchaseQuantity: parseInt(value),
    //  });
    dispatchREDUX(updateCartQuantity(item, Number(value)));
      

     idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
   }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
