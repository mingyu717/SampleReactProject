import React from "react";
import moment from "moment";

const AppointmentReview = props => {
  const { timeSlot, jobDate, advisorName, transportMethodName } = props.data;
  const isTransportationOptionsVisible = JSON.parse(
    sessionStorage.getItem("isTransportationOptionsVisible") || null
  );
  return (
    <React.Fragment>
      <h3 className="text-center">Appointment Review</h3>
      <div className="card card-full-width text-center">
        <div className="review-time">
          <h2>
            {timeSlot && timeSlot !== "null"
              ? moment(timeSlot.split("-")[0], "HH:mm").format("hh:mm A")
              : "Not Selected"}
          </h2>
          <p>{moment(jobDate).format("dddd, DD MMM YYYY")}</p>
          <div className="time-items">
            <div className="time-items__item">
              <p className="label">Advisor agent</p>
              <p className="bold">
                {advisorName && advisorName !== "null"
                  ? advisorName
                  : "First available Advisor"}
              </p>
            </div>
            <div className="time-items__item">
              <p className="label">Transportation</p>
              <p className="bold">
                {isTransportationOptionsVisible
                  ? transportMethodName
                  : "Drop off your vehicle"}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a
            href="/bookService/appointment"
            className="button button-medium button-secondary secondary-blue "
          >
            Edit
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentReview;
