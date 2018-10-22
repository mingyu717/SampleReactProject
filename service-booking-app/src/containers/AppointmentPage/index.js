import React, { Component } from "react";
import moment from "moment";
import StepHeader from "components/Header/StepHeader";
import ChooseAdvisor from "containers/AppointmentPage/ChooseAdvisor";
import SelectTransportation from "containers/AppointmentPage/SelectTransportation";
import DayPicker from "containers/AppointmentPage/DayPicker";
import TimePicker from "containers/AppointmentPage/TimePicker";
import ActionButton from "containers/AppointmentPage/ActionButton";
import Enums from "constants/enum";
import fetchAppointmentSlots from "./fetchAppointmentSlots";
import fetchServiceAdvisors from "./fetchServiceAdvisors";
import { predefinedTimeSlotOptions } from "constants/predefinedOptions";
import { saveData } from "containers/AppointmentPage/saveData";
import WithLoader from "components/WithLoader/index";
import WithErrorPage from "components/WithErrorPage";

export default class AppointmentPage extends Component {
  state = {
    isLoading: true,
    isError: false,
    transportMethodData: null,
    selectedTransportMethod: "",
    workCapacities: null,
    dateData: null,
    selectedDate: null,
    timeSlotData: null,
    selectedTimeSlot: null,
    advisorData: null,
    selectedAdvisorId: ""
  };

  initializeTransportMethodState = data => {
    if (
      data.Option &&
      data.Option.length &&
      data.WorksDiaryDetails &&
      data.WorksDiaryDetails.length
    ) {
      const transportMethodData = Object.assign(
        {},
        ...data.Option.map(item => ({ [item.OptionID]: item }))
      );
      const transportMethodHistoryValue = sessionStorage.getItem(
        "transportMethod"
      );
      const transportMethodInitialValue =
        transportMethodHistoryValue &&
        Object.keys(transportMethodData).includes(transportMethodHistoryValue)
          ? transportMethodHistoryValue
          : Object.keys(transportMethodData)[0];
      const workCapacities = Object.assign(
        {},
        ...data.WorksDiaryDetails.map(item => ({
          [item.Date]: item.CapacityFree
        }))
      );

      this.setState(
        {
          transportMethodData,
          workCapacities
        },
        () => this.onSetSelectedTransportMethod(transportMethodInitialValue)
      );
    }
  };

  initializeDayPickerState = () => {
    const slotArrayData = this.state.transportMethodData[
      this.state.selectedTransportMethod
    ].Slots;
    const minmumFreeCapacity = sessionStorage.getItem("minmumFreeCapacity");

    if (slotArrayData && slotArrayData.length) {
      const stringifiedPredefinedTimeSlotOptions = JSON.stringify([
        ...predefinedTimeSlotOptions.am,
        ...predefinedTimeSlotOptions.pm
      ]);
      const dateData = Object.assign(
        {},
        ...slotArrayData.map(slot => {
          if (
            moment().isBefore(slot.Date, "day") &&
            this.state.workCapacities[slot.Date] &&
            this.state.workCapacities[slot.Date] >= minmumFreeCapacity
          ) {
            const availabilityType =
              JSON.stringify(slot.Slots) ===
              stringifiedPredefinedTimeSlotOptions
                ? Enums.DateAvailabilityType.Full
                : Enums.DateAvailabilityType.Partial;
            return {
              [slot.Date]: {
                timeSlots: slot.Slots,
                availabilityType: availabilityType
              }
            };
          }
        })
      );

      const selectedDateHistoryValue = sessionStorage.getItem("jobDate");
      const selectedDateInitialValue =
        selectedDateHistoryValue &&
        Object.keys(dateData).includes(selectedDateHistoryValue)
          ? selectedDateHistoryValue
          : Object.keys(dateData)[0];
      this.setState({ dateData: dateData }, () =>
        this.onSetSelectedDate(selectedDateInitialValue)
      );
    }
  };

  initializeTimePickerState = () => {
    const timeSlots =
      this.state.dateData && this.state.selectedDate
        ? this.state.dateData[this.state.selectedDate].timeSlots
        : null;
    if (timeSlots && timeSlots.length) {
      const selectedTimeSlotHistoryValue = sessionStorage.getItem("timeSlot");
      const selectedTimeSlotInitialValue =
        selectedTimeSlotHistoryValue &&
        timeSlots.includes(selectedTimeSlotHistoryValue)
          ? selectedTimeSlotHistoryValue
          : timeSlots[0];
      this.setState(
        {
          timeSlotData: timeSlots
        },
        () => this.onSetSelectedTimeSlot(selectedTimeSlotInitialValue)
      );
    }
  };

  initializeAdvisorListState = data => {
    if (data.Results && data.Results.AdvisorData) {
      const advisorData = Object.assign(
        {},
        ...data.Results.AdvisorData.map(item => ({ [item.AdvisorID]: item }))
      );
      const selectedAdvisorIdHistoryValue = sessionStorage.getItem("advisorId");
      sessionStorage.setItem("advisorId", "");
      const selectedAdvisorIdInitialValue =
        selectedAdvisorIdHistoryValue &&
        Object.keys(advisorData).includes(selectedAdvisorIdHistoryValue)
          ? selectedAdvisorIdHistoryValue
          : "";
      this.setState(
        {
          advisorData
        },
        () => this.onSetSelectedAdvisorId(selectedAdvisorIdInitialValue)
      );
    }
  };

  onReceiveAppointmentSlotsResponse = response => {
    this.setState({ isLoading: false });
    this.initializeTransportMethodState(response);
  };

  onAppointmentSlotsError = () => {
    this.setState({
      isLoading: false,
      isError: true
    });
  };

  onReceiveServiceAdvisorsResponse = response => {
    this.initializeAdvisorListState(response);
  };

  onSetSelectedTransportMethod = selectedTransportMethod => {
    this.setState({ selectedTransportMethod }, this.initializeDayPickerState);
  };

  onSetSelectedDate = selectedDate => {
    this.setState(
      { selectedDate: selectedDate },
      this.initializeTimePickerState
    );
  };

  onSetSelectedTimeSlot = selectedTimeSlot => {
    const requestInput = {
      selectedDate: this.state.selectedDate,
      selectedTransportMethod: this.state.selectedTransportMethod,
      selectedTimeSlot
    };
    this.setState(
      { selectedTimeSlot: selectedTimeSlot, advisorData: null },
      fetchServiceAdvisors(requestInput, this.onReceiveServiceAdvisorsResponse)
    );
  };

  onSetSelectedAdvisorId = selectedAdvisorId => {
    this.setState({ selectedAdvisorId });
  };

  componentDidMount() {
    fetchAppointmentSlots()
      .then(response => {
        this.onReceiveAppointmentSlotsResponse(response);
      })
      .catch(() => {
        this.onAppointmentSlotsError();
      });
  }

  render() {
    const isTransportationOptionsVisible = JSON.parse(
      sessionStorage.getItem("isTransportationOptionsVisible") || null
    );
    const isAdvisorsVisible = JSON.parse(
      sessionStorage.getItem("isAdvisorsVisible") || null
    );

    const {
      isLoading,
      isError,
      transportMethodData,
      selectedTransportMethod,
      dateData,
      selectedDate,
      timeSlotData,
      selectedTimeSlot,
      advisorData,
      selectedAdvisorId
    } = this.state;

    return (
      <WithErrorPage isError={isError}>
        <div>
          <StepHeader
            headerTitle="Appointment"
            goBackLink="/bookService/selectServices"
            stepNumber={Enums.ProgressBarStepNumber.Appointment}
          />
          <main>
            <WithLoader isLoading={isLoading}>
              <section className="full-width">
                <div className="card">
                  <SelectTransportation
                    data={transportMethodData}
                    selectedValue={selectedTransportMethod}
                    onSetSelectedValue={this.onSetSelectedTransportMethod}
                    isVisible={isTransportationOptionsVisible}
                  />
                  <DayPicker
                    dateData={dateData}
                    selectedDate={selectedDate}
                    onSetSelectedDate={this.onSetSelectedDate}
                  />
                  <TimePicker
                    timeSlotData={timeSlotData}
                    selectedTimeSlot={selectedTimeSlot}
                    onSetSelectedTimeSlot={this.onSetSelectedTimeSlot}
                  />
                  <ChooseAdvisor
                    advisorData={advisorData}
                    selectedAdvisorId={selectedAdvisorId}
                    onSetSelectedAdvisorId={this.onSetSelectedAdvisorId}
                    isVisible={isAdvisorsVisible}
                  />
                </div>
              </section>
              <section>
                <ActionButton
                  saveData={() => saveData(this.state)}
                  isEnabled={
                    this.state.selectedTransportMethod &&
                    this.state.selectedDate &&
                    this.state.selectedTimeSlot
                  }
                />
              </section>
            </WithLoader>
          </main>
        </div>
      </WithErrorPage>
    );
  }
}
