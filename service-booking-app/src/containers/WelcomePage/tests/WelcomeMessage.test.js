import React from "react";
import { shallow } from "enzyme";
import WelcomeMessage from "../WelcomeMessage";

describe("<WelcomeMessage />", () => {
  it("should render welcome message", () => {
    const wrapper = shallow(<WelcomeMessage userName="userName" />);
    expect(wrapper.containsMatchingElement(<h2>Hi userName</h2>)).toEqual(true);
  });

  it("should render welcome message as . . .", () => {
    const wrapper = shallow(<WelcomeMessage userName={null} />);
    expect(wrapper.containsMatchingElement(<h2>. . .</h2>)).toEqual(true);
  });
});
