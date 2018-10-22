import React from "react";
import { mount } from "enzyme";
import TimePicker from "../TimePicker";

const mountTimePicker = (props = {}) => mount(<TimePicker {...props} />);

describe("<TimePicker />", () => {
  let timeSlotData;
  let selectedTimeSlot;
  let onSetSelectedTimeSlot;

  beforeEach(() => {
    timeSlotData = ["07:30-07:45", "07:45-08:00", "08:00-08:15", "08:15-08:30"];
    selectedTimeSlot = "07:30-07:45";
    onSetSelectedTimeSlot = jest.fn();
  });

  it("should not select a time slot if none is not given", () => {
    const wrapper = mountTimePicker({
      timeSlotData,
      selectedTimeSlot: null,
      onSetSelectedTimeSlot
    });
    expect(wrapper.find(".item-time.selected").length).toEqual(0);
  });

  it("should select a time slot if it is given", () => {
    const wrapper = mountTimePicker({
      timeSlotData,
      selectedTimeSlot,
      onSetSelectedTimeSlot
    });
    expect(wrapper.find(".item-time.selected").length).toEqual(1);
  });

  it("should render available time slots", () => {
    const wrapper = mountTimePicker({
      timeSlotData,
      selectedTimeSlot,
      onSetSelectedTimeSlot
    });
    expect(wrapper.find(".item-time.available").length).toEqual(4);
  });

  it("should call onSetSelectedTimeSlot if time slot clicked", () => {
    const wrapper = mountTimePicker({
      timeSlotData,
      selectedTimeSlot,
      onSetSelectedTimeSlot
    });
    const target = wrapper.find(".item-time.available").at(0);
    target.simulate("click");
    expect(onSetSelectedTimeSlot).toHaveBeenCalled();
  });

  it("should not call onSetSelectedTimeSlot if unavailable time slot clicked", () => {
    const wrapper = mountTimePicker({
      timeSlotData,
      selectedTimeSlot,
      onSetSelectedTimeSlot
    });
    const target = wrapper.find(".item-time.unavailable").at(0);
    target.simulate("click");
    expect(onSetSelectedTimeSlot).not.toHaveBeenCalled();
  });
});
