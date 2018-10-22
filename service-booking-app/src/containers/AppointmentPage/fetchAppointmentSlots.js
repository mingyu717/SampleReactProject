import { fetchApi } from "utils/apiFetchWrapper";
import { Api, ApiSource } from "constants/api";
import { dayPickerOptionalDuration } from "constants/predefinedOptions";
import moment from "moment";

const fetchAppointmentSlots = () => {
  const jobCode = [
    sessionStorage.getItem("distanceBasedServiceCode"),
    ...JSON.parse(sessionStorage.getItem("additionalServiceCodes"))
  ];
  const rooftopId = sessionStorage.getItem("rooftopId");

  const data = {
    RooftopId: rooftopId,
    InitialDate: moment().format("YYYY-MM-DD"),
    EndDate: moment()
      .add(dayPickerOptionalDuration, "day")
      .format("YYYY-MM-DD"),
    JobCode: jobCode
  };

  return fetchApi(ApiSource.CDK, Api.CDK.Endpoint.GetAppointmentSlots, data);
};

export default fetchAppointmentSlots;
