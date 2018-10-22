import { fetchApi } from "utils/apiFetchWrapper";
import { Api, ApiSource } from "constants/api";

export const dismissVehicleOwner = (
  dealerId,
  customerNo,
  vehicleNo,
  onReceiveResponse
) => {
  const request = {
    DealerId: dealerId,
    CustomerNo: customerNo,
    VehicleNo: vehicleNo
  };
  return fetchApi(
    ApiSource.CustomerVehicle,
    Api.CustomerVehicle.Endpoint.DismissVehicleOwnership,
    request
  ).then(() => {
    onReceiveResponse();
  });
};
