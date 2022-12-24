import { Fragment } from "react";
import classes from "./Header.module.css";
import Wrapper from "./Wrapper";
import CartButton from "../Cart/CartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Wrapper className={classes.wrapper}>
          <h3>SimplifiedNotino</h3>
          <CartButton onClick={props.onIsActive} />
        </Wrapper>
      </header>
    </Fragment>
  );
};
export default Header;
