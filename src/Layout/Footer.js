import { Fragment } from "react";
import Wrapper from "./Wrapper";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <Fragment>
      <footer className={classes.footer}>
        <Wrapper className={classes.wrapper}>
          <a href="mailto: bbrkic@tvz.hr">bbrkic@tvz.hr</a>
        </Wrapper>
      </footer>
    </Fragment>
  );
};

export default Footer;
