import moment from "moment";

export const isSameDay = (day1, day2) => {
  if (!moment.isMoment(day1) || !moment.isMoment(day2)) return false;
  return (
    day1.date() === day2.date() &&
    day1.month() === day2.month() &&
    day1.year() === day2.year()
  );
};

export const isDayInList = (day, dateList) => {
  return dateList.some(date => isSameDay(day, date));
};
