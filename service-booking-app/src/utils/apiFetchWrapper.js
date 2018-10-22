import { ApiSource, Api } from "constants/api";
import { appendSlashToUrl } from "utils/urlUtils";
import { logError } from "utils/logUtils";
import { SOLErrorCode } from "constants/SOLErrorCode";

export const fetchApi = (apiSource, endpoint, body = undefined) => {
  const { url, headers } = getUrlAndHeaders(apiSource, endpoint);
  const options = {
    method: body === undefined ? "GET" : "POST",
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  };
  switch (apiSource) {
    case ApiSource.CDK:
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            try {
              return response.json().then(json => {
                logAndThrowError(json.Message, endpoint);
              });
            } catch (error) {
              logAndThrowError(
                response.status + " " + response.statusText,
                endpoint
              );
            }
          }
          return response.json();
        })
        .then(response => {
          if (response.Result && response.Result.ErrorCode) {
            logAndThrowError(
              SOLErrorCode[response.Result.ErrorCode] ||
                response.Result.ErrorCode,
              endpoint
            );
          }
          return response;
        });

    default:
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            try {
              return response.text().then(text => {
                if (text.length) {
                  const logErrorMessage = `${text} on fetching ${endpoint} `;
                  logError(logErrorMessage);
                  throw new Error(JSON.parse(text));
                }
                logAndThrowError(
                  response.status + " " + response.statusText,
                  endpoint
                );
              });
            } catch (error) {
              logAndThrowError(
                response.status + " " + response.statusText,
                endpoint
              );
            }
          }
          return response.text();
        })
        .then(res => {
          return res.length ? JSON.parse(res) : {};
        });
  }
};

const logAndThrowError = (errorMessage, endpoint) => {
  const logErrorMessage = `${errorMessage} on fetching ${endpoint} `;
  logError(logErrorMessage);
  throw new Error(errorMessage);
};

const getUrlAndHeaders = (apiSource, endpoint) => {
  let url = "";
  let headers = {};

  switch (apiSource) {
    case ApiSource.CDK:
      const token = sessionStorage.getItem("token");
      const communityId = sessionStorage.getItem("communityId");
      url = `${Api.CDK.Url}/${communityId}/ServiceOnline/${endpoint}`;
      headers = {
        Accept: "application/json",
        Authorization: "DataHub-Token " + token,
        "Content-Type": "application/json"
      };
      break;

    case ApiSource.CustomerVehicle:
      url = appendSlashToUrl(Api.CustomerVehicle.Url) + endpoint;
      headers = {
        "Content-Type": "application/json",
        "x-functions-key": Api.CustomerVehicle.XFunctionsKey
      };
      break;

    case ApiSource.DealerConfiguration:
      url = appendSlashToUrl(Api.DealerConfiguration.Url) + endpoint;
      headers = {
        "Content-Type": "application/json",
        "x-functions-key": Api.DealerConfiguration.XFunctionsKey
      };
      break;

    case ApiSource.VehicleMaintenance:
      url = appendSlashToUrl(Api.VehicleMaintenance.Url) + endpoint;
      headers = {
        "Content-Type": "application/json",
        "x-functions-key": Api.VehicleMaintenance.XFunctionsKey
      };
      break;

    default:
      break;
  }

  return { url, headers };
};
