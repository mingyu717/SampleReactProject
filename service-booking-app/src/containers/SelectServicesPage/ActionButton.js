import React from "react";

const ActionButton = props => {
  const { onClick, isEnabled } = props;
  return (
    <a
      href="/bookService/appointment"
      className={
        "button button-blue button-large" + (isEnabled ? "" : " disable")
      }
      onClick={onClick}
    >
      Book Appointment
    </a>
  );
};

export default ActionButton;
