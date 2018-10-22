import React from "react";

const ActionButton = props => {
  const { onClick } = props;
  return (
    <a
      href="/bookService/selectServices"
      className={"button button-blue button-large"}
      onClick={onClick}
    >
      Book Service
    </a>
  );
};

export default ActionButton;
