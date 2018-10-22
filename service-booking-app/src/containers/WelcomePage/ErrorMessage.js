import React from "react";
const ErrorMessage = props => {
  const { errorMessage, dealerName, dealerPhoneNumber } = props;

  switch (errorMessage) {
    case "Invitation expired":
      return (
        <p>
          Welcome to Service booking. Your invitation has expired, please
          contact {dealerName} on{" "}
          <a href={"tel:" + dealerPhoneNumber} className="text-blue">
            {dealerPhoneNumber}
          </a>
        </p>
      );
    default:
      return dealerName && dealerPhoneNumber ? (
        <p>
          Welcome to Service booking. We are not able to process your request,
          please contact {dealerName} on{" "}
          <a href={"tel:" + dealerPhoneNumber} className="text-blue">
            {dealerPhoneNumber}
          </a>
        </p>
      ) : (
        <p>
          Welcome to Service booking. We are not able to process your request,
          please make sure the url was not modified from your message or email
        </p>
      );
  }
};

export default ErrorMessage;
