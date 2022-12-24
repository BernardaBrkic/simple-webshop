import { useEffect, useState } from "react";
import Wrapper from "../Layout/Wrapper";
import ProductItem from "./ProductItem";
import classes from "./ProductsList.module.css";

const imgLink="https://www.freeiconspng.com/uploads/error-icon-15.png"
const API_URL =
  "https://products-cc00a-default-rtdb.europe-west1.firebasedatabase.app/products.json";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [urlError, setUrlError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const outputProducts = [];

      for (const key in responseData) {
        outputProducts.push({
          id: key,
          brand: responseData[key].brand,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setProducts(outputProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setUrlError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (urlError) {
    return (
      <section className={classes.error}>
        <p>{urlError}</p>
        <img src={imgLink} alt="" />
      </section>
    );
  }

  const productList = products.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      brand={product.brand}
      name={product.name}
      description={product.description}
      price={product.price}
    />
  ));

  return (
    <Wrapper className={classes.wrapper}>
      <h2>Product list</h2>
      <ul className={classes.products}>{productList}</ul>
    </Wrapper>
  );
};

export default ProductsList;
