import React from "react";

const ActionButton = props => {
  const { saveData, isEnabled } = props;
  return (
    <a
      href="/bookService/review"
      onClick={saveData}
      className={
        "button button-blue button-large" + (isEnabled ? "" : " disable")
      }
    >
      Next
    </a>
  );
};

export default ActionButton;
