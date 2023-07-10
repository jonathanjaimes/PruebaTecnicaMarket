import React from "react";
import { contextMarket, totalPrice } from "../pages/Principal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import principalStyles from "../styles/principal.module.scss";
import logo from "../assets/logoMarket.jpg";

const Header = () => {
  const { cartProducts, eraseAll } = React.useContext(contextMarket);
  return (
    <div className={principalStyles.PrincipalContainer_header}>
      <div className={principalStyles.PrincipalContainer_header_logo}>
        <img src={logo} alt="logo" width="100%" />
      </div>
      <div className={principalStyles.PrincipalContainer_header_contCart}>
        <div
          className={`${principalStyles.PrincipalContainer_header_cart} 
            ${
              cartProducts?.length > 0 &&
              principalStyles.PrincipalContainer_header_cartNoProducts
            }`}
        >
          <ShoppingCartOutlined className={principalStyles.cartIcon} /> $
          {totalPrice(cartProducts)}
        </div>
        {cartProducts?.length > 0 && (
          <div onClick={() => eraseAll()} className={principalStyles.eraseAll}>
            X
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
