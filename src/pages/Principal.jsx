import React from "react";
import principalStyles from "../styles/principal.module.scss";
import ComponentList from "../components/ComponentList";
import Cart from "../components/Cart";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";

export const contextMarket = React.createContext();

export const totalPrice = (cartProducts) => {
  let total = 0;
  cartProducts?.forEach((product) => {
    total += product.price;
  });
  return total;
};

const Principal = () => {
  const [cartProducts, setCartProducts] = React.useState([]);
  const refCartProducts = React.useRef();
  const resolution = React.useRef(window.screen.width);
  const [isShowRightBar, setIsShowRightBar] = React.useState(false);
  const addProduct = (product) => {
    console.log("HOLA")
    setCartProducts([...cartProducts, product]);
    refCartProducts.current = [...cartProducts, product];
    localStorage.setItem("products", JSON.stringify(refCartProducts.current));
  };
  const deleteProduct = (idToDelete) => {
    const indexToDelete = cartProducts.findIndex(
      (item) => item.id === idToDelete
    );
    if (indexToDelete !== -1) {
      cartProducts.splice(indexToDelete, 1);
      setCartProducts([...cartProducts]);
      refCartProducts.current = [...cartProducts];
      localStorage.setItem("products", JSON.stringify(refCartProducts.current));
    }
  };
  const eraseAll = () => {
    setCartProducts([]);
    refCartProducts.current = [];
    localStorage.setItem("products", JSON.stringify(refCartProducts.current));
  };

  React.useEffect(() => {
    let produ =  JSON.parse( localStorage.getItem( 'products' ) ) || []
    setCartProducts([...produ])
  }, []);

  return (
    <contextMarket.Provider
      value={{ addProduct, cartProducts, deleteProduct, eraseAll }}
    >
      <div className={principalStyles.PrincipalContainer}>
        {resolution.current > 375 ? <Header /> : <HeaderMobile />}
        <div className={principalStyles.titlesContainer}>
          <div className={principalStyles.leftTitle}>Store</div>
          {resolution.current > 375 ? (
            <div className={principalStyles.rightTitle}> Products</div>
          ) : (
            <MenuOutlined
              onClick={() => setIsShowRightBar(true)}
              className={principalStyles.menuIcon}
            />
          )}
        </div>
        <div className={principalStyles.PrincipalContainer_body}>
          <ComponentList />
          {resolution.current > 375 && <Cart />}
        </div>
        {isShowRightBar && (
          <div className={principalStyles.maskMobile}>
            <div className={principalStyles.maskMobileContent}>
              <div className={principalStyles.closeContainer}>
                <div className={principalStyles.rightTitle}> Products</div>
                <CloseOutlined
                  onClick={() => setIsShowRightBar(false)}
                  className={principalStyles.closeIcon}
                />
              </div>
              <div className={principalStyles.cartMobileContainer}>
                <Cart />
              </div>
            </div>
          </div>
        )}
      </div>
    </contextMarket.Provider>
  );
};

export default Principal;
