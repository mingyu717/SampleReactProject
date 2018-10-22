import React from "react";
import Cleave from "cleave.js/react";
import CleavePhone from "cleave.js/dist/addons/cleave-phone.i18n";

const ContactInformationForm = props => {
  const {
    firstName,
    firstNameError,
    surname,
    surnameError,
    email,
    emailError,
    phoneNumber,
    phoneNumberError,
    additionalComments
  } = props.data;
  const { handleSubmit, onSetValue } = props;
  const isSubmitDisabled =
    firstNameError || surnameError || emailError || phoneNumberError;
  return (
    <React.Fragment>
      <div className="card contact">
        <div className="form-group">
          <label for="firstName">First Name*</label>
          <input
            className="selected"
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            spellCheck="false"
            onChange={event => {
              onSetValue(event.target.name, event.target.value);
            }}
          />
          <span className="error">
            {firstNameError && "Please input your first name"}
          </span>
        </div>
        <div className="form-group">
          <label for="surname">Last Name*</label>
          <input
            className="selected"
            type="text"
            name="surname"
            id="surname"
            value={surname}
            spellCheck="false"
            onChange={event => {
              onSetValue(event.target.name, event.target.value);
            }}
          />
          <span className="error">
            {surnameError && "Please input your last name"}
          </span>
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            className="selected"
            type="email"
            name="email"
            id="email"
            value={email}
            spellCheck="false"
            onChange={event => {
              onSetValue(event.target.name, event.target.value);
            }}
          />
          <span className="error">
            {emailError && "Please input your email"}
          </span>
        </div>
        <div className="form-group">
          <label for="phoneNumber">Phone Number</label>
          <Cleave
            options={{ phone: true, phoneRegionCode: "NZ" }}
            className="selected"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={event => {
              onSetValue(event.target.name, event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label for="additionalComments">Additional Comments?</label>
          <textarea
            name="additionalComments"
            id="additionalComments"
            cols="30"
            rows="3"
            maxLength="100"
            placeholder="Type here any additional comment"
            value={additionalComments}
            onChange={event => {
              onSetValue(event.target.name, event.target.value);
            }}
          />
        </div>
      </div>
      <a
        className={
          "button button-blue button-large" +
          (isSubmitDisabled ? " disable" : "")
        }
        onClick={handleSubmit}
      >
        Save
      </a>
    </React.Fragment>
  );
};

export default ContactInformationForm;
