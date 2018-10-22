import React from "react";
import homeHeroImage from "assets/img/home-hero-image.png";

const CarDetail = props => {
  const { modelYear, modelName, mileage } = props.data;
  return (
    <div className="cart__car-details">
      <img src={homeHeroImage} alt="" />
      <div className="desc">
        <h4 className="text-small extra-bold">{`${modelYear} ${modelName}`}</h4>
        <h4 className="text-small light">
          {"Approx. " + Number(mileage).toLocaleString() + "km"}
        </h4>
      </div>
    </div>
  );
};

export default CarDetail;
