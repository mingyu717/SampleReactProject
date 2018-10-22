import React from "react";

const ActionButton = props => {
  const { isEnabled } = props;
  return (
    <a
      href="/bookService/carDetails"
      className={
        "button button-blue button-large" + (isEnabled ? "" : " disable")
      }
    >
      Start Now
    </a>
  );
};

export default ActionButton;
