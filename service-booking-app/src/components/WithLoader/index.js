import React from "react";
import Spinner from "react-spinkit";

const WithLoader = props => {
  const {
    isLoading = false,
    children,
    isContentShown = true,
    message = "Loading"
  } = props;

  if (isContentShown) {
    return (
      <div className="loader-wrapper">
        {isContentShown && children}
        {isLoading && (
          <div className="loader-overlay">
            <div className="loader">
              <Spinner name="line-scale" fadeIn="quarter" />
              <span>{message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return isLoading ? (
    <div className="loader">
      <Spinner name="line-scale" fadeIn="quarter" />
      <span>Loading</span>
    </div>
  ) : (
    children
  );
};

export default WithLoader;
