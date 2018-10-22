import React from "react";
import moment from "moment";

const ConfirmationItems = props => {
  const {
    timeSlot,
    jobDate,
    advisorName,
    vehicleDesc,
    transportMethodName,
    dealerName,
    dealerAddress
  } = props.data;

  const serviceStartTime =
    timeSlot && timeSlot !== "null"
      ? moment(timeSlot.split("-")[0], "HH:mm").format("hh:mm A")
      : null;
  const serviceEndTime =
    timeSlot && timeSlot !== "null"
      ? moment(timeSlot.split("-")[1], "HH:mm").format("hh:mm A")
      : null;
  const serviceDate =
    jobDate && jobDate !== "null"
      ? moment(jobDate).format("DD MMM YYYY")
      : null;
  const isSyncCalendarVisible =
    serviceStartTime && serviceEndTime && serviceDate;
  const isTransportationOptionsVisible = JSON.parse(
    sessionStorage.getItem("isTransportationOptionsVisible") || null
  );

  return (
    <div className="confirmation-items">
      <div className="confirmation-items__item">
        <p className="label">Time</p>
        <p className="bold">{serviceStartTime || "Not Selected"}</p>
      </div>
      <div className="confirmation-items__item">
        <p className="label">Date</p>
        <p className="bold">{serviceDate || "Not Selected"}</p>
      </div>
      <div className="confirmation-items__item">
        <p className="label">Advisor</p>
        <p className="bold">
          {advisorName && advisorName !== "null"
            ? advisorName
            : "First available Advisor"}
        </p>
      </div>
      <div className="confirmation-items__item">
        <p className="label">Vehicle</p>
        <p className="bold">{vehicleDesc}</p>
      </div>
      <div className="confirmation-items__item">
        <p className="label">Transportation</p>
        <p className="bold">
          {isTransportationOptionsVisible
            ? transportMethodName
            : "Drop off your vehicle"}
        </p>
      </div>
      <div className="confirmation-items__item">
        <p className="label">Sync to your calendar</p>
        {isSyncCalendarVisible ? (
          <div
            title="Add to Calendar"
            className="addeventatc"
            data-render="inline-buttons"
          >
            <span className="start">
              {serviceDate + " " + serviceStartTime}
            </span>
            <span className="end">{serviceDate + " " + serviceEndTime}</span>
            <span className="timezone">New_Zealand/Auckland</span>
            <span className="title">Vehicle Service</span>
            <span className="description">
              Vehicle {vehicleDesc} at {dealerName}
            </span>
            <span className="location">{dealerAddress}</span>
          </div>
        ) : (
          <p className="bold">Please select date and time for service</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmationItems;
