import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartValues = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.identifier === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingProductIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingProduct = state.items[existingProductIndex];
    let updatedProducts;

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + action.item.amount,
      };
      updatedProducts = [...state.items];
      updatedProducts[existingProductIndex] = updatedProduct;
    } else {
      updatedProducts = state.items.concat(action.item);
    }

    return {
      items: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.identifier === "REMOVE") {
    const existingProductIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingProduct = state.items[existingProductIndex];
    const updatedTotalAmount = state.totalAmount - existingProduct.price;
    let updatedProducts;

    if (existingProduct.amount === 1) {
      updatedProducts = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount - 1,
      };
      updatedProducts = [...state.items];
      updatedProducts[existingProductIndex] = updatedProduct;
    }
    return {
      items: updatedProducts,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartValues;
  }

  return defaultCartValues;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartValues
  );

  const addItemHandler = (item) => {
    dispatchCartActions({ identifier: "ADD", item: item });
  };

  const removeItemHandler = (id) =>
    dispatchCartActions({ identifier: "REMOVE", id: id });

  const clearCartHandler = () => {
    dispatchCartActions({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
