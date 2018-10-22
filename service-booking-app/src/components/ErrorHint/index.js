import React from "react";

const Message = props => {
  const { heading = "Oh no!", title, desc } = props;
  return (
    <React.Fragment>
      <h1 className="extra-bold">{heading}</h1>
      <h3 className="extra-bold">{title}</h3>
      <p className="extra-padding">{desc}</p>
    </React.Fragment>
  );
};

const ErrorHint = props => {
  const { title, desc, heroImage, history, buttonText = "Back Home" } = props;
  const queryString = sessionStorage.getItem("queryString") || "";
  return (
    <div className="error-page">
      <div className="close-btn-wrapper">
        {history && (
          <a onClick={history.goBack} className="close-btn icon-cancel grey" />
        )}
      </div>
      <img className="hero-image" src={heroImage} alt="" />
      <Message title={title} desc={desc} />
      {buttonText && (
        <section>
          <a
            href={"/" + queryString}
            className="button button-blue button-large"
          >
            {buttonText}
          </a>
        </section>
      )}
    </div>
  );
};

export default ErrorHint;
