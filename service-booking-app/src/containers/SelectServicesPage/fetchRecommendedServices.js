import { fetchApi } from "utils/apiFetchWrapper";
import { Api, ApiSource } from "constants/api";

const fetchRecommendedServices = () => {
  const mileage = sessionStorage.getItem("mileage");
  const makeCode = sessionStorage.getItem("makeCode");
  const dealerId = sessionStorage.getItem("dealerId");
  const modelCode = sessionStorage.getItem("modelCode");
  const modelYear = sessionStorage.getItem("modelYear");

  const body = {
    DealerId: dealerId,
    MakeCode: makeCode,
    ModelCode: modelCode,
    EstOdometer: mileage,
    ModelYear: modelYear
  };

  const endpoint = Api.VehicleMaintenance.Endpoint.GetRecommendedServices;

  return fetchApi(ApiSource.VehicleMaintenance, endpoint, body);
};

export default fetchRecommendedServices;
