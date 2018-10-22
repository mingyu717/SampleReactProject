import React from "react";
import ErrorMessage from "./ErrorMessage";

const Error = props => {
  const { errorMessage, dealerName, dealerPhoneNumber } = props;
  return (
    <React.Fragment>
      <h2>Hi</h2>
      <ErrorMessage
        errorMessage={errorMessage}
        dealerName={dealerName}
        dealerPhoneNumber={dealerPhoneNumber}
      />
    </React.Fragment>
  );
};

export default Error;
