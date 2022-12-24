import React from "react";
import classes from "./ProductItemInput.module.css";

const ProductItemInput = React.forwardRef((props, ref) => {
  return (
    <div className={classes["input-item"]}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default ProductItemInput;
