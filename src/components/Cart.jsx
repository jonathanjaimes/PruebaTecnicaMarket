import React from "react";
import principalStyles from "../styles/principal.module.scss";
import { contextMarket, totalPrice } from "../pages/Principal";
import { findSelected } from "../components/ComponentList";
import { MinusOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import images from "../components/images";
import PayButton from "./PayButton";

const Cart = () => {
  const { addProduct, cartProducts, deleteProduct } =
    React.useContext(contextMarket);
  const [productRender, setProductRender] = React.useState([]);
  const [isShowPayment, setIsShowPayment] = React.useState(false);
  const resolution = React.useRef(window.innerWidth);
  const filterUniqueProducts = () => {
    const uniqueProducts = cartProducts.filter((product, index, self) => {
      return index === self.findIndex((t) => t.id === product.id);
    });
    setProductRender(uniqueProducts);
  };
  React.useEffect(() => {
    filterUniqueProducts();
  }, [cartProducts]);

  return (
    <div
      className={
        resolution.current > 375
          ? principalStyles.CartContainer
          : principalStyles.CartContainer_mobile
      }
    >
      {cartProducts.length > 0 && (
        <div className={principalStyles.CartContainer_contButton}>
          <button
            onClick={() => {
              setIsShowPayment(!isShowPayment);
            }}
          >
            {!isShowPayment ? "Vamos a pagar!" : "Volvamos al carrito!"}
          </button>
        </div>
      )}

      {productRender.map((products, index) => {
        if (!isShowPayment) {
          return (
            <div
              className={principalStyles.CartContainer_productContainer}
              key={products.id}
            >
              <div className={principalStyles.CartContainer_image}>
                <div
                  className={`${principalStyles.addFloatCircle} ${principalStyles.addFloatCircleVisible} ${principalStyles.addFloatCircleNoCursorPointer}`}
                >
                  {findSelected(cartProducts, products.id)}
                </div>
                <img
                  src={images[index]}
                  alt={products.name}
                  width="auto"
                  height="100%"
                />
              </div>
              <div className={principalStyles.CartContainer_info}>
                <span>
                  {products.name} <span>${products.price} c/u</span>
                </span>
                <div className={principalStyles.containerCountSigns}>
                  <div
                    onClick={() => {
                      deleteProduct(products.id);
                    }}
                    className={principalStyles.signBox}
                  >
                    <MinusOutlined />
                  </div>
                  <div
                    onClick={() => {
                      addProduct(products);
                    }}
                    className={`${principalStyles.signBox} ${principalStyles.signBoxPrimary}`}
                  >
                    <PlusOutlined />
                  </div>
                </div>
              </div>
              <div className={principalStyles.CartContainer_description}>
                {products.description}
              </div>
            </div>
          );
        }

        return (
          <div key={products.id}>
            <div className={principalStyles.CartContainer_cartDone}>
              <div className={principalStyles.CartContainer_circle}>
                {findSelected(cartProducts, products.id)}
              </div>
              <div className={principalStyles.CartContainer_productSmallImage}>
                <img
                  src={images[index]}
                  alt={products.name}
                  width="auto"
                  height="100%"
                />
              </div>
            </div>
          </div>
        );
      })}
      {isShowPayment && (
        <p className={principalStyles.totalText}>
          Total <span>${totalPrice(cartProducts)}</span>
        </p>
      )}

      {cartProducts.length === 0 && (
        <div className={principalStyles.CartContainer_contAlert}>
          <SmileOutlined className={principalStyles.smileIconAlert} />
          <p className={principalStyles.CartContainer_alertText}>
            Please choose a product on the left
          </p>
        </div>
      )}
      {totalPrice(cartProducts) > 0 && isShowPayment && (
        <div className={principalStyles.payButton}>
          <PayButton total={totalPrice(cartProducts)} />
        </div>
      )}
    </div>
  );
};

export default Cart;
