import React from "react";
import { shallow } from "enzyme";
import SelectTransportation from "../SelectTransportation";

describe("<SelectTransportation />", () => {
  it("should return null when isVisible is false", () => {
    const wrapper = shallow(<SelectTransportation isVisible={false} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("should return null when data has no value", () => {
    const wrapper = shallow(<SelectTransportation data={null} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("should return not null when isVisible is true and data has value", () => {
    const wrapper = shallow(
      <SelectTransportation isVisible={true} data={"value"} />
    );
    expect(wrapper.getElement()).not.toBeNull();
  });
});
