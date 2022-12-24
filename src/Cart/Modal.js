import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onIsInactive}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.everything}>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};

const modalElements = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onIsInactive={props.onIsInactive} />,
        modalElements
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalElements
      )}
    </Fragment>
  );
};

export default Modal;
