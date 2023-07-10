import React from "react";
import principalStyles from "../styles/principal.module.scss";
import { products } from "../data/products";
import { contextMarket } from "../pages/Principal";
import images from "../components/images";

export const findSelected = (cartProducts, id) => {
  return cartProducts.filter((thisProduct) => thisProduct.id === id).length;
};

const ComponentList = () => {
  const { addProduct, cartProducts } = React.useContext(contextMarket);
  const resolution = React.useRef(window.innerWidth);
  return (
    <div className={principalStyles.ComponentListContainer}>
      <div className={principalStyles.ComponentList_products}>
        {products.map((product, index) => {
          return (
            <div
              key={product.id}
              className={
                findSelected(cartProducts, product.id) + 1 > 1
                  ? `${principalStyles.ComponentList_cardProduct} ${principalStyles.boderCardSelected}`
                  : principalStyles.ComponentList_cardProduct
              }
            >
              <div
                onClick={() => {
                  addProduct(product);
                }}
                className={
                  findSelected(cartProducts, product.id) + 1 > 1 ||
                  resolution.current <= 375
                    ? `${principalStyles.addFloatCircle} ${principalStyles.addFloatCircleVisible}`
                    : `${principalStyles.addFloatCircle}`
                }
              >
                <span>
                  {findSelected(cartProducts, product.id) > 0
                    ? findSelected(cartProducts, product.id)
                    : "+"}
                </span>
              </div>
              <img
                src={images[index]}
                alt={products.name}
                width="80%"
                height="80%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentList;
