import React from "react";
import { shallow, mount } from "enzyme";
import DayPicker from "../DayPicker";
import { DayPickerSingleDateController } from "react-dates";
import Enums from "constants/enum";

const mountDayPicker = (props = {}) => mount(<DayPicker {...props} />);

describe("<DayPicker />", () => {
  let dateData;
  let selectedDate;
  let onSetSelectedDate;

  beforeEach(() => {
    dateData = {
      "2018-09-14": { availabilityType: Enums.DateAvailabilityType.Full },
      "2018-09-15": { availabilityType: Enums.DateAvailabilityType.Partial }
    };
    selectedDate = "2018-09-14";
    onSetSelectedDate = jest.fn();
  });

  it("should render DayPickerSingleDateController", () => {
    const wrapper = shallow(
      <DayPicker
        dateData={dateData}
        selectedDate={selectedDate}
        onSetSelectedDate={onSetSelectedDate}
      />
    );
    expect(wrapper.find(DayPickerSingleDateController).length).toBe(1);
  });

  it("should not select a date if selectedDate is not given", () => {
    const wrapper = mountDayPicker({
      dateData,
      selectedDate: "",
      onSetSelectedDate
    });
    expect(wrapper.find(".CalendarDay__selected").length).toEqual(0);
  });

  it("should select a date if selectedDate is in the available dates", () => {
    const wrapper = mountDayPicker({
      dateData,
      selectedDate: "2018-09-14",
      onSetSelectedDate
    });
    expect(wrapper.find(".CalendarDay__selected").length).toEqual(1);
  });

  it("should render dates with className 'PartiallyAvailable' if it is partially available", () => {
    const wrapper = mountDayPicker({
      dateData: {
        "2018-09-14": { availabilityType: Enums.DateAvailabilityType.Full },
        "2018-09-15": { availabilityType: Enums.DateAvailabilityType.Partial }
      },
      selectedDate,
      onSetSelectedDate
    });
    expect(
      wrapper
        .find(".PartiallyAvailable")
        .children(".DayText")
        .text()
    ).toEqual("15");
  });

  it("should render dates with className 'FullyAvailable' if it is fully available", () => {
    const wrapper = mountDayPicker({
      dateData: {
        "2018-09-10": { availabilityType: Enums.DateAvailabilityType.Full },
        "2018-09-11": { availabilityType: Enums.DateAvailabilityType.Partial }
      },
      selectedDate,
      onSetSelectedDate
    });
    expect(
      wrapper
        .find(".FullyAvailable")
        .children(".DayText")
        .text()
    ).toEqual("10");
  });

  it("should call onSetSelectedDate if an available date clicked", () => {
    const wrapper = mountDayPicker({
      dateData,
      selectedDate,
      onSetSelectedDate
    });
    const targetDate = wrapper.find("[aria-label='Saturday, September 15, 2018']")
    targetDate.simulate('click');
    expect(onSetSelectedDate).toHaveBeenCalled();
  });

  it("should highlight the date if clicked", () => {
    const wrapper = mountDayPicker({
      dateData,
      selectedDate,
      onSetSelectedDate
    });
    wrapper.find("[aria-label='Sunday, September 16, 2018']").simulate('click');
    expect(onSetSelectedDate).not.toHaveBeenCalled();
  });
});
