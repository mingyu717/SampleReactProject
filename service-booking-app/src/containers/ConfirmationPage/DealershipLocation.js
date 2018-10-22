import React, { Fragment } from "react";
import iconPhone from "assets/img/icon-phone.svg";
import iconLocation from "assets/img/icon-location.svg";
import { Api } from "constants/api";

const DealershipLocation = props => {
  const {
    dealerName,
    dealerAddress,
    dealerPhoneNumber,
    longitude,
    latitude
  } = props.data;

  return (
    <Fragment>
      <h3 className="text-center">{dealerName} Location</h3>
      <div className="google-map">
        <iframe
          src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=14&output=embed&key=${Api.GoogleService.Key}`}
          width="100%"
          height="100%"
          frameBorder="0"
          title="DealerLocation"
          allowFullScreen={true}
        />
      </div>
      <div className="address">
        <div className="address__item">
          <span>
            <img src={iconLocation} alt="" />
          </span>
          <span>{dealerAddress}</span>
        </div>
        <div className="address__item">
          <span>
            <img src={iconPhone} alt="" />
          </span>
          <a href={"tel:" + dealerPhoneNumber} className="text-blue">
            {dealerPhoneNumber}
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default DealershipLocation;
