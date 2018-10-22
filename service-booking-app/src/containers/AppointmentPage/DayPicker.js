import React from "react";
import { calendarDaySize } from "utils/responsiveUtils";
import { DayPickerSingleDateController } from "react-dates";
import Enums from "constants/enum";
import moment from "moment";

const onDateChange = (moment, dateData, onSetSelectedDate) => {
  const date = moment.format("YYYY-MM-DD");
  if (dateData && date in dateData) {
    onSetSelectedDate(date);
  }
};

const dayAvailabilityType = (date, dateData) => {
  if (dateData && date in dateData) {
    if (dateData[date].availabilityType === Enums.DateAvailabilityType.Full) {
      return "FullyAvailable";
    }
    if (
      dateData[date].availabilityType === Enums.DateAvailabilityType.Partial
    ) {
      return "PartiallyAvailable";
    }
  }
  return "NotAvailable";
};

const DayContents = (moment, dateData) => (
  <div
    className={
      "DayContent " + dayAvailabilityType(moment.format("YYYY-MM-DD"), dateData)
    }
  >
    <div className="DayText">{moment.format("D")}</div>
    <div className="DotMarker">&#11044;</div>
  </div>
);

const DayPicker = props => {
  const { dateData, selectedDate, onSetSelectedDate } = props;

  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="">Select Date</label>
        <div className="DayPickerWrapper">
          <DayPickerSingleDateController
            onDateChange={moment =>
              onDateChange(moment, dateData, onSetSelectedDate)
            }
            date={selectedDate ? moment(selectedDate) : null}
            noBorder={true}
            showKeyboardShortcuts={false}
            hideKeyboardShortcutsPanel={true}
            daySize={calendarDaySize}
            numberOfMonths={1}
            renderDayContents={moment => DayContents(moment, dateData)}
          />
        </div>
      </div>
      <ul className="calendar-indicators">
        <li className="indicator__item text-blue">All times are available</li>
        <li className="indicator__item text-orange">
          Limited times are available
        </li>
      </ul>
    </React.Fragment>
  );
};

export default DayPicker;
