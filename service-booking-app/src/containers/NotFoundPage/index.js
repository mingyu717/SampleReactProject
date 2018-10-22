import React from "react";
import ErrorHint from "components/ErrorHint";
import Error404Img from "assets/img/404-error.svg";

const NotFoundPage = props => (
  <ErrorHint
    heroImage={Error404Img}
    title="Page not found"
    desc="The page you are looking for doesn't seem to exist."
    history={props.history}
  />
);

export default NotFoundPage;
