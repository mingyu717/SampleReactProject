import React from "react";
import { mount } from "enzyme";
import ReportButton from "../ReportButton";

describe("<ReportButton />", () => {
  let onClick;
  beforeEach(() => {
    onClick = jest.fn();
  });

  it("should have Report button", () => {
    const wrapper = mount(<ReportButton onClick={onClick} />);
    expect(
      wrapper.containsMatchingElement([
        <a className={"button button-secondary secondary-blue button-small"}>
          Report
        </a>
      ])
    ).toBeTruthy();
  });

  it("should call onClick if the button is clicked", () => {
    const wrapper = mount(<ReportButton onClick={onClick} />);
    const reportButton = wrapper.find("a.button");
    reportButton.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
