import React, { Component } from "react";
import Header from "components/Header/Header";
import iconTick from "assets/img/icon-ticked-white.svg";
import Enums from "constants/enum";

export default class StepHeader extends Component {
  render() {
    return (
      <Header
        headerTitle={this.props.headerTitle}
        goBackLink={this.props.goBackLink}
      >
        {this.props.children}
        <div className="progress">
          <div>
            <span
              className={
                "progress__number" +
                (this.props.stepNumber ===
                Enums.ProgressBarStepNumber.SelectServices
                  ? " selected"
                  : "")
              }
            >
              1
            </span>
            <span
              className={
                "progress__number" +
                (this.props.stepNumber ===
                Enums.ProgressBarStepNumber.Appointment
                  ? " selected"
                  : "")
              }
            >
              2
            </span>
            <span
              className={
                "progress__number" +
                (this.props.stepNumber === Enums.ProgressBarStepNumber.Review
                  ? " selected"
                  : "")
              }
            >
              <img src={iconTick} alt="" />
            </span>
          </div>
        </div>
      </Header>
    );
  }
}
