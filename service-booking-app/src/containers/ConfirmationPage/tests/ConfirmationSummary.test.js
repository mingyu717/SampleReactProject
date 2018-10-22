import React from "react";
import { shallow, Enzyme } from "enzyme";
import ConfirmationSummary from "../ConfirmationSummary";

let summaryData = {
  timeSlot: "09:15-09:30",
  jobDate: "2018-09-29",
  vehicleDesc: "HONDA Civic Si Sedan 6-Speed Manual",
  advisorName: "Hayden",
  transportMethodDesc: "APP01",
  dealerName: "Experieco Test 2",
  dealerAddress: "New Market, Auckland"
};

describe("<ConfirmationSummary /", () => {
  [null, "null", "", undefined].forEach(timeSlot => {
    it("should show 'Not Selected' if timeSlot is null", () => {
      summaryData.timeSlot = timeSlot;
      const wrapper = shallow(<ConfirmationSummary data={summaryData} />);
      expect(
        wrapper.containsMatchingElement([
          <div className="confirmation-items__item">
            <p className="label">Time</p>
            <p className="bold">Not Selected</p>
          </div>,
          <div className="confirmation-items__item">
            <p className="label">Sync to your calendar</p>
            <p className="bold">Please select date and time for service</p>
          </div>
        ])
      ).toBeTruthy();
      summaryData.timeSlot = "09:15-09:30";
    });
  });

  [null, "null", "", undefined].forEach(jobDate => {
    it("should show 'Not Selected' if jobDate is null", () => {
      summaryData.jobDate = jobDate;
      const wrapper = shallow(<ConfirmationSummary data={summaryData} />);
      expect(
        wrapper.containsMatchingElement([
          <div className="confirmation-items__item">
            <p className="label">Date</p>
            <p className="bold">Not Selected</p>
          </div>,
          <div className="confirmation-items__item">
            <p className="label">Sync to your calendar</p>
            <p className="bold">Please select date and time for service</p>
          </div>
        ])
      ).toBeTruthy();
      summaryData.jobDate = "2018-09-29";
    });
  });

  it("should show correct time and date", () => {
    const wrapper = shallow(<ConfirmationSummary data={summaryData} />);
    expect(
      wrapper.containsAllMatchingElements([
        <div className="confirmation-items__item">
          <p className="label">Time</p>
          <p className="bold">09:15 AM</p>
        </div>,
        <div className="confirmation-items__item">
          <p className="label">Date</p>
          <p className="bold">29 Sep 2018</p>
        </div>,
        <div className="confirmation-items__item">
          <p className="label">Sync to your calendar</p>
          <div
            title="Add to Calendar"
            className="addeventatc"
            data-render="inline-buttons"
          >
            <span className="start">29 Sep 2018 09:15 AM</span>
            <span className="end">29 Sep 2018 09:30 AM</span>
            <span className="timezone">New_Zealand/Auckland</span>
            <span className="title">Vehicle Service</span>
            <span className="description">
              Vehicle HONDA Civic Si Sedan 6-Speed Manual at Experieco Test 2
            </span>
            <span className="location">New Market, Auckland</span>
          </div>
        </div>
      ])
    ).toBeTruthy();
  });
});
