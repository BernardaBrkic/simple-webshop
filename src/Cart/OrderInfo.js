import { useRef, useState } from "react";
import classes from "./OrderInfo.module.css";

const isEmpty = (value) => value.trim() === "";

const OrderInfo = (props) => {
  const [isInputValid, setIsInputValid] = useState({
    firstname: true,
    lastname: true,
    address: true,
    city: true,
  });

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredFirstname = firstnameRef.current.value;
    const enteredLastname = lastnameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCity = cityRef.current.value;

    const isFirstnameValid = !isEmpty(enteredFirstname);
    const isLastnameValid = !isEmpty(enteredLastname);
    const isAddressValid = !isEmpty(enteredAddress);
    const isCityValid = !isEmpty(enteredCity);

    setIsInputValid({
      firstname: isFirstnameValid,
      lastname: isLastnameValid,
      address: isAddressValid,
      city: isCityValid,
    });

    const validForm =
      isFirstnameValid && isLastnameValid && isAddressValid && isCityValid;

    if (!validForm) {
      return;
    }

    props.onOrder({
      firstname: enteredFirstname,
      lastname: enteredLastname,
      address: enteredAddress,
      city: enteredCity,
    });
  };

  return (
    <div className={classes["order-info"]}>
      <h3>Checkout info</h3>
      <form className={classes["order-info"]} onSubmit={confirmHandler}>
        <div className={classes["input-field"]}>
          <label htmlFor="firstname">Firstname:</label>
          <input type="text" id="firstname" ref={firstnameRef} />
          {!isInputValid.firstname && (
            <p className={classes.feedback}>Please enter a valid firstname!</p>
          )}
        </div>
        <div className={classes["input-field"]}>
          <label htmlFor="lastname">Lastname:</label>
          <input type="text" id="lastname" ref={lastnameRef} />
          {!isInputValid.lastname && (
            <p className={classes.feedback}>Please enter a valid lastname!</p>
          )}
        </div>
        <div className={classes["input-field"]}>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" ref={addressRef} />
          {!isInputValid.address && (
            <p className={classes.feedback}>Please enter a valid address!</p>
          )}
        </div>
        <div className={classes["input-field"]}>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" ref={cityRef} />
          {!isInputValid.city && (
            <p className={classes.feedback}>Please enter a valid city name!</p>
          )}
        </div>
        <div className={classes["button-field"]}>
          <button onClick={props.onCancel}>Cancel</button>
          <button>Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default OrderInfo;
