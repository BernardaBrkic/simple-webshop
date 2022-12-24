import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "./Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import OrderInfo from "./OrderInfo";
import React from "react";

const APP_URL =
  "https://products-cc00a-default-rtdb.europe-west1.firebasedatabase.app/orders.json";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [wasOrdered, setWasOrdered] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartTotalPrice = `€${cartCtx.totalAmount.toFixed(2)}`;
  const isEmptyCart = cartCtx.items.length > 0;

  const removeCartProductHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addCartProducHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsOrdering(true);
  };
  const sendOrderHandler = async (info) => {
    setWasOrdered(true);
    await fetch(APP_URL, {
      method: "POST",
      body: JSON.stringify({
        user: info,
        orderedItems: cartCtx.items,
      }),
    });

    setWasOrdered(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-products"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeCartProductHandler.bind(null, item.id)}
          onAdd={addCartProducHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const endingButtons = (
    <div className={classes.actions}>
      <button onClick={props.onIsInactive}>Close</button>
      {isEmptyCart && <button onClick={orderHandler}>Order</button>}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      <h2 className={classes.heading}>Cart list</h2>
      {cartItems}
      <div className={classes.total}>
        <span>Total price</span>
        <span>{cartTotalPrice}</span>
      </div>
      {isOrdering && (
        <OrderInfo onOrder={sendOrderHandler} onCancel={props.onIsInactive} />
      )}
      {!isOrdering && endingButtons}
    </React.Fragment>
  );

  const submittingOrderFeedback = <p>Sending order data...</p>;

  const submittedFeedback = (
    <React.Fragment>
      <p>Your order was successfully submitted!</p>
      <div className={classes.actions}>
        <button onClick={props.onIsInactive}>Close</button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onIsInactive={props.onIsInactive}>
      {!wasOrdered && !didSubmit && modalContent}
      {wasOrdered && submittingOrderFeedback}
      {!wasOrdered && didSubmit && submittedFeedback}
    </Modal>
  );
};

export default Cart;
