import React from "react";

const Header = props => {
  const { dealerName, logo } = props;
  return (
    <React.Fragment>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <span className="no-margin extra-bold">{dealerName}</span>
    </React.Fragment>
  );
};

export default Header;
