import React from "react";
import ErrorHint from "components/ErrorHint";
import GeneralErrorImg from "assets/img/general-error.svg";

const GeneralErrorPage = props => {
  const {
    history = null,
    message = "Please try again in few minutes.",
    buttonText
  } = props;
  return (
    <ErrorHint
      heroImage={GeneralErrorImg}
      title="Something went wrong"
      desc={message}
      history={history}
      buttonText={buttonText}
    />
  );
};

export default GeneralErrorPage;
