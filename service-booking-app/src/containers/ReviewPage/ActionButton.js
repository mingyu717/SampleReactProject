import React from "react";

const ActionButton = props => {
  const { isEnabled, onClick } = props;
  return (
    <a
      className={
        "button button-blue button-large" + (isEnabled ? "" : " disable")
      }
      onClick={onClick}
    >
      Book Now
    </a>
  );
};

export default ActionButton;
