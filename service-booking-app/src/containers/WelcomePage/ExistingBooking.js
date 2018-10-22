import React from "react";

const ExistingBooking = props => {
  const { existingBooking, dealerName, dealerPhoneNumber } = props;
  return (
    <React.Fragment>
      <h2>Hi</h2>
      <p>
        Welcome to Service booking. You have already made a booking for this
        car, booking reference: {existingBooking}. If you want to modify this
        booking, please contact {dealerName} on{" "}
        <a href={"tel:" + dealerPhoneNumber} className="text-blue">
          {dealerPhoneNumber}
        </a>
      </p>
    </React.Fragment>
  );
};

export default ExistingBooking;
