import classes from "./HeroImage.module.css";
import Wrapper from "./Wrapper";

const HeroImage = () => {
  return (
    <div className={classes.hero}>
      <div className={classes.overlay}>
        <Wrapper>
          <h2>
            There are endless ways to enhance beauty. You never know when you
            will find your perfect lipstick - unless you keep experimenting.
          </h2>
        </Wrapper>
      </div>
    </div>
  );
};

export default HeroImage;
