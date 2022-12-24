import { useRef, useState } from "react";
import classes from "./ProductItemForm.module.css";
import ProductItemInput from "./ProductItemInput";

const ProductItemForm = (props) => {
  const [amountValidator, setAmountValidator] = useState(true);
  const enteredAmountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = enteredAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmount > 5
    ) {
      setAmountValidator(false);
      return;
    }

    props.onAddItem(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <ProductItemInput
        ref={enteredAmountRef}
        label="Amount:"
        input={{
          id: "amount_" + props.id,
          type: "number",
          step: "1",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountValidator && <p>Please enter a valid amount of products (1-5)</p>}
    </form>
  );
};

export default ProductItemForm;
