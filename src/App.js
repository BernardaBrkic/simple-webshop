import React, { useState } from "react";
import Cart from "./Cart/Cart";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import HeroImage from "./Layout/HeroImage";
import ProductsList from "./Products/ProductsList";
import CartProvider from "./store/CartProvider";

function App() {
  const [modalIsActive, setModalIsActive] = useState(false);

  const opetModalHandler = () => {
    setModalIsActive(true);
  };

  const closeModalHandler = () => {
    setModalIsActive(false);
  };

  return (
    <CartProvider>
      {modalIsActive && <Cart onIsInactive={closeModalHandler} />}
      <Header onIsActive={opetModalHandler} />
      <HeroImage />
      <ProductsList />
      <Footer />
    </CartProvider>
  );
}

export default App;
