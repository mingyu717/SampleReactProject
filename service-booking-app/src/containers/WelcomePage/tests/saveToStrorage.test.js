import { saveDealerConfiguration, saveCustomerVehicle } from "../saveToStorage";

const response = {
  DealerId: 1,
  DealerName: "Ebbett Volkswagen",
  RooftopId: "EBBVW11DEV",
  CommunityId: "EBBETDEV",
  Address: "490 Grey Street, Hamilton East, New Zealand",
  PhoneNumber: "07-903 2240",
  CommunicationMethod: 0,
  Latitude: -37.790991,
  Longitude: 175.293276,
  AppThemeName: "DefaultTheme",
  HasDropOff: true,
  HasCourtesyCar: true
};

describe("saveToStorage", () => {
  describe("saveDealerConfiguration", () => {
    it("should return the correct type and the passed name", () => {
      saveDealerConfiguration(response);
      expect(sessionStorage.setItem).toHaveBeenCalled();
    });
  });
});

describe("saveToStorage", () => {
  describe("saveCustomerVehicle", () => {
    it("should return the correct type and the passed name", () => {
      saveCustomerVehicle(response);
      expect(sessionStorage.setItem).toHaveBeenCalled();
    });
  });
});
