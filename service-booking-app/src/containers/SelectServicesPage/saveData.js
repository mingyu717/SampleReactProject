export const saveData = (state, selectedServicesData) => {
  sessionStorage.setItem(
    "distanceBasedServiceCode",
    state.selectedDistanceBasedService
  );
  sessionStorage.setItem(
    "additionalServiceCodes",
    JSON.stringify(state.selectedAdditionalServices)
  );
  sessionStorage.setItem(
    "selectedServicesData",
    JSON.stringify([
      ...selectedServicesData.DistanceBasedServices,
      ...selectedServicesData.AdditionalServices
    ])
  );
};
