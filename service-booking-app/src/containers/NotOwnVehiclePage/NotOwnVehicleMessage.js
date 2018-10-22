import React from "react";

const NotOwnVehicleMessage = props => {
  const { userName, dealerPhoneNumber } = props;
  return (
    <React.Fragment>
      <h2>{userName ? `Hi ${userName}` : ". . ."}</h2>
      <p className="extra-padding">
        Thanks for letting us know. We will update our records. If you own
        another vehicle that is due for a service please give us a call{" "}
        <a href={"tel:" + dealerPhoneNumber} className="text-blue">
          {dealerPhoneNumber}
        </a>
      </p>
    </React.Fragment>
  );
};

export default NotOwnVehicleMessage;
