import { fetchApi } from "utils/apiFetchWrapper";
import { validateEmail } from "utils/emailUtils";
import { Api, ApiSource } from "constants/api";

export const updateCustomerContact = (data, onReceiveResponse) => {
  const request = {
    DealerId: data.dealerId,
    CustomerNo: data.customerNo,
    FirstName: data.firstName,
    SurName: data.surname,
    CustomerEmail: data.email,
    PhoneNumber: data.phoneNumber,
    AdditionalComments: data.additionalComments
  };
  return fetchApi(
    ApiSource.CustomerVehicle,
    Api.CustomerVehicle.Endpoint.UpdateCustomerContact,
    request
  ).then(() => {
    onReceiveResponse();
  });
};

export const saveData = data => {
  sessionStorage.setItem("firstName", data.firstName);
  sessionStorage.setItem("surname", data.surname);
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("phoneNumber", data.phoneNumber);
};

export const validation = {
  isNotEmpty(value) {
    return Boolean(value);
  },
  isEmail(email) {
    return validateEmail(email);
  }
};
