import React from "react";
import { shallow } from "enzyme";
import ActionButton from "../ActionButton";

describe("<ActionButton />", () => {
  it("should disable button if not ready", () => {
    const wrapper = shallow(<ActionButton isEnabled={false} />);
    expect(wrapper.find("a").hasClass("disable")).toEqual(true);
  });

  it("should enable button if isReady", () => {
    const wrapper = shallow(<ActionButton isEnabled={true} />);
    expect(wrapper.find("a").hasClass("disable")).toEqual(false);
  });
});
