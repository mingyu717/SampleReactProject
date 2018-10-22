export const saveDealerConfiguration = response => {
  sessionStorage.setItem("dealerName", response.DealerName);
  sessionStorage.setItem("dealerId", response.DealerId);
  sessionStorage.setItem("dealerAddress", response.Address);
  sessionStorage.setItem("dealerPhoneNumber", response.PhoneNumber);
  sessionStorage.setItem("latitude", response.Latitude);
  sessionStorage.setItem("longitude", response.Longitude);
  sessionStorage.setItem("appThemeName", response.AppThemeName);
  sessionStorage.setItem(
    "isTransportationOptionsVisible",
    JSON.stringify(response.ShowTransportations)
  );
  sessionStorage.setItem(
    "isAdvisorsVisible",
    JSON.stringify(response.ShowAdvisors)
  );
  sessionStorage.setItem("isPriceVisible", JSON.stringify(response.ShowPrice));
  sessionStorage.setItem(
    "minmumFreeCapacity",
    response.MinmumFreeCapacity || 0
  );
};

export const saveCustomerVehicle = response => {
  sessionStorage.setItem("token", response.CdkAutolineToken);
  sessionStorage.setItem("communityId", response.CommunityId);
  sessionStorage.setItem("rooftopId", response.RooftopId);
  sessionStorage.setItem("customerId", response.CustomerLoginId);
  sessionStorage.setItem("firstName", response.FirstName);
  sessionStorage.setItem("surname", response.Surname);
  sessionStorage.setItem("email", response.CustomerEmail);
  sessionStorage.setItem("phoneNumber", response.PhoneNumber);
  sessionStorage.setItem("registrationNumber", response.RegistrationNo);
  sessionStorage.setItem("makeCode", response.MakeCode);
  sessionStorage.setItem("modelYear", response.ModelYear);
  sessionStorage.setItem("modelCode", response.ModelCode);
  sessionStorage.setItem("modelName", response.ModelDescription);
  sessionStorage.setItem("nextServiceMileage", response.NextServiceMileage);
  sessionStorage.setItem("variantCode", response.VariantCode);
  sessionStorage.setItem("customerNo", response.CustomerNo);
  sessionStorage.setItem("vehicleNo", response.VehicleNo);
};
