import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `€${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes.info}>
        <p>{props.name}</p>
        <span>{price}</span>
      </div>
      <div className={classes.amount}>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>-</button>
          <button onClick={props.onAdd}>+</button>
        </div>
        <span>Amount: x{props.amount}</span>
      </div>
    </li>
  );
};

export default CartItem;
