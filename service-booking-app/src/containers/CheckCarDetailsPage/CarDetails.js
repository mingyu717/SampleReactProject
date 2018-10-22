import React from "react";
import HomeHeroImage from "assets/img/home-hero-image.png";
import ReportButton from "containers/CheckCarDetailsPage/ReportButton";

const CarDetailsCard = props => {
  const { modelYear, modelName, registrationNumber } = props.detailData;
  const { onClickReport } = props;
  return (
    <div className="card">
      <div className="card__image">
        {/* This image should load from api*/}
        <img className="hero-image" src={HomeHeroImage} alt="" />
      </div>
      <div className="card__title">
        <p>
          <b>{modelYear}</b> {modelName}
        </p>
        <p className="text-grey">
          Registration Number: <b>{registrationNumber}</b>
        </p>
      </div>
      <div className="card__title ">
        <ReportButton onClick={onClickReport} />
      </div>
    </div>
  );
};

export default CarDetailsCard;
