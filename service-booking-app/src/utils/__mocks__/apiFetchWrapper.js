import { ApiSource } from "constants/api";

export const fetchApi = (apiSource, endpoint, body = undefined) => {
  const response = getResponse(apiSource, endpoint);
  return new Promise((resolve, reject) => {
    response.ok
      ? resolve(response.json)
      : reject({
          message:
            "Failed to fetch: " + response.status + " " + response.statusText
        });
  });
};

const getResponse = (apiSource, endpoint) => {
  switch (apiSource) {
    case ApiSource.CDK:
      break;

    case ApiSource.DealerConfiguration:
      if (endpoint === "dealers/1") {
        return {
          ok: true,
          json: {}
        };
      }
      return {
        ok: false,
        status: 404,
        statusText: "Not Found"
      };

    case ApiSource.CustomerVehicle:
      if (endpoint === "dealers/1/customers/1/vehicles/1") {
        return {
          ok: true,
          json: {}
        };
      }
      return {
        ok: false,
        status: 404,
        statusText: "Not Found"
      };

    default:
      break;
  }
};
