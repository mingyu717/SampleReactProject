import React from "react";
import { Link } from "react-router-dom";

const CheckContactInfo = props => {
  const { data, checkContactRef } = props;
  return (
    <React.Fragment>
      <h3 className="text-center">Check Your Contact Information</h3>
      <div ref={checkContactRef} className="card card-full-width">
        <div className="contact contact-list extra-bottom-padding">
          <div className="list__item">
            <p>First Name:</p>
            <p className="bold">{data.firstName}</p>
          </div>
          <div className="list__item">
            <p>Last Name:</p>
            <p className="bold">{data.surname}</p>
          </div>
          <div className="list__item">
            <p>Email:</p>
            <p className="bold">{data.email}</p>
          </div>
          <div className="list__item">
            <p>Phone Number:</p>
            <p className="bold">{data.phoneNumber}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-grey">Not Correct?</p>
          <Link
            to="/bookService/contactInformation"
            className="button button-medium button-secondary secondary-blue "
          >
            Edit
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckContactInfo;
