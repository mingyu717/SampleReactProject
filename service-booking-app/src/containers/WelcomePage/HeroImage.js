import React from "react";

const HeroImage = props => {
  const { img } = props;
  return <img className="hero-image" src={img} alt="" />;
};

export default HeroImage;
