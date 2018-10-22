import React from "react";

const Header = props => (
  <header className="sub-header">
    <a className="icon-back" onClick={props.goBack} />
    <h2>Shopping Cart</h2>
  </header>
);

export default Header;
