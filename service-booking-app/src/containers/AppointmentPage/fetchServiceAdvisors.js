import { fetchApi } from "utils/apiFetchWrapper";
import { Api, ApiSource } from "constants/api";

const fetchServiceAdvisors = (requestInput, onReceiveResponse) => {
  const rooftopId = sessionStorage.getItem("rooftopId");
  const customerId = sessionStorage.getItem("customerId");

  const data = {
    RooftopId: rooftopId,
    CustomerId: customerId,
    AppointmentDate: requestInput.selectedDate,
    TransportMethod: requestInput.selectedTransportMethod,
    DropOffTime: requestInput.selectedTimeSlot
  };

  fetchApi(ApiSource.CDK, Api.CDK.Endpoint.GetServiceAdvisors, data)
    .then(response => {
      onReceiveResponse(response);
    })
    .catch(() => {});
};

export default fetchServiceAdvisors;
