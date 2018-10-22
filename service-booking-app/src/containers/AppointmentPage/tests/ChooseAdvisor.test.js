import React from "react"
import {shallow} from "enzyme"
import ChooseAdvisor from "../ChooseAdvisor"

describe("<ChooseAdvisor /", ()=>{
  it("should return null when isVisible is false", () => {
    const wrapper = shallow(<ChooseAdvisor isVisible={false} />)
    expect(wrapper.getElement()).toBeNull();
  });
  
  it("should not return null when isVisible is true", () => {
    const wrapper = shallow(<ChooseAdvisor isVisible={true} />)
    expect(wrapper.getElement()).not.toBeNull();
  });
})