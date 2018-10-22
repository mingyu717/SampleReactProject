import React from "react";
import GeneralErrorPage from "containers/GeneralErrorPage";

const WithErrorPage = props => {
  const { children, isError = false, buttonText } = props;

  if (isError) {
    return <GeneralErrorPage buttonText={buttonText} />;
  }

  return children;
};

export default WithErrorPage;
