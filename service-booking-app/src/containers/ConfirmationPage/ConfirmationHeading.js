import React from "react";

const ConfirmationHeading = props => {
  const { firstName, wipNo } = props.data;

  return (
    <div className="confirmation-headings">
      <h1 className="text-extra-large">Thanks {firstName}</h1>
      <p>Your appointment is confirmed.</p>
      <div className="confirmation__number">
        <p className="label">Confirmation Number</p>
        <div className="confirm-number">{wipNo}</div>
      </div>
    </div>
  );
};

export default ConfirmationHeading;
