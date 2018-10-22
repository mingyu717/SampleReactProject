import React from "react";

const WelcomeMessage = props => {
  const { userName } = props;
  return (
    <React.Fragment>
      <h2>{userName ? `Hi ${userName}` : ". . ."}</h2>
      <p className="extra-padding">
        Welcome to Ebbett. Click on the button below to schedule your car
        service with us.
      </p>
    </React.Fragment>
  );
};

export default WelcomeMessage;
