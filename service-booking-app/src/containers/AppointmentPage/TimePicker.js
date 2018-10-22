import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { predefinedTimeSlotOptions } from "constants/predefinedOptions";

const TimeSlotBtnGroup = props => {
  const {
    availableTimeSlotList,
    selectedTimeSlot,
    predefinedOptions,
    onSetSelectedValue
  } = props;

  const isAvailable = (option, availableList) => {
    return availableList && availableList.includes(option);
  };

  return (
    <div className="l-grid l-three-col grid-gap-16">
      {predefinedOptions.map(
        (predefinedOption, index) =>
          isAvailable(predefinedOption, availableTimeSlotList) ? (
            <a
              key={"timeSlot-" + index}
              className={
                "item-time available" +
                (selectedTimeSlot === predefinedOption ? " selected" : "")
              }
              onClick={() => onSetSelectedValue(predefinedOption)}
            >
              {predefinedOption.split("-")[0]}
            </a>
          ) : (
            <a key={"timeSlot-" + index} className={"item-time unavailable"}>
              {predefinedOption.split("-")[0]}
            </a>
          )
      )}
    </div>
  );
};

const TimePicker = props => {
  const { timeSlotData, selectedTimeSlot, onSetSelectedTimeSlot } = props;

  return (
    <div className="form-group">
      <label htmlFor="">Select Appointment Time</label>
      <Tabs selectedTabClassName="current" disabledTabClassName="disabled">
        <TabList className="tabs text-center">
          <Tab
            className="tab-time"
            disabled={!timeSlotData || !timeSlotData.length}
          >
            AM
          </Tab>
          <Tab
            className="tab-time"
            disabled={!timeSlotData || !timeSlotData.length}
          >
            PM
          </Tab>
          <hr />
        </TabList>
        <TabPanel className="tab-content">
          <TimeSlotBtnGroup
            availableTimeSlotList={timeSlotData}
            predefinedOptions={predefinedTimeSlotOptions.am}
            selectedTimeSlot={selectedTimeSlot}
            onSetSelectedValue={onSetSelectedTimeSlot}
          />
        </TabPanel>
        <TabPanel className="tab-content">
          <TimeSlotBtnGroup
            availableTimeSlotList={timeSlotData}
            predefinedOptions={predefinedTimeSlotOptions.pm}
            selectedTimeSlot={selectedTimeSlot}
            onSetSelectedValue={onSetSelectedTimeSlot}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TimePicker;
