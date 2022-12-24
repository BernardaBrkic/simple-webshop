import { Fragment, useContext } from "react";
import classes from "./ProductItem.module.css";
import ProductItemForm from "./ProductItemForm";
import CartContext from "../store/cart-context";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `€${props.price.toFixed(2)}`;

  const addItemHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <Fragment>
      <li className={classes.product}>
        <div className={classes.info}>
          <h3>
            {props.name}, <span>{props.brand}</span>
          </h3>
          <p>{props.description}</p>
          <p>Price: {price}</p>
        </div>
        <ProductItemForm onAddItem={addItemHandler} />
      </li>
      <hr />
    </Fragment>
  );
};

export default ProductItem;
