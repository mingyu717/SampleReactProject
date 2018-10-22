import React from "react";

const ReportButton = props => {
  const { onClick } = props;
  return (
    <a
      onClick={onClick}
      className={"button button-secondary secondary-blue button-small"}
    >
      Not My Vehicle
    </a>
  );
};

export default ReportButton;
