import { useContext, useState, useEffect } from "react";
import CartContext from "../store/cart-context";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const [wasProductAdded, setWasProductAdded] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const itemAmount = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const animationClasses = `${classes.button} ${
    wasProductAdded ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setWasProductAdded(true);

    const timer = setTimeout(() => {
      setWasProductAdded(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={animationClasses} onClick={props.onClick}>
      <span>
        <i className="fa-solid fa-cart-shopping"></i>
      </span>
      <span>Cart</span>
      <span>{itemAmount}</span>
    </button>
  );
};
export default CartButton;
