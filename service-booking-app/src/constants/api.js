export const ApiSource = {
  CDK: "CDK",
  CDKMock: "CDKMock",
  CustomerVehicle: "CustomerVehicle",
  DealerConfiguration: "DealerConfiguration",
  VehicleMaintenance: "VehicleMaintenance"
};

export const Api = {
  CDK: {
    Partner: {
      Id: "EBBETDEVPK",
      Key: "e694dc32-e8d9-4378-87b6-cd96e320b453",
      Version: "1"
    },
    MockUrl: "https://84efa6a9-42c8-449f-8586-9102abe6bcd5.mock.pstmn.io",
    Url: "https://sol-portal2-r3.dmsdigital.net/api",
    Endpoint: {
      RequestToken: "RequestToken",
      ActivateToken: "ActivateToken",
      CheckPassword: "CheckPassword",
      GetCustomerInformation: "GetCustomerInformation",
      ChassisPrePopulation: "ChassisPrePopulation",
      GetCustomerVehicleList: "GetCustomerVehicleList",
      GetCustomerVehicleDetails: "GetCustomerVehicleDetails",
      GetDistanceBasedService: "GetDistanceBasedService",
      GetServiceAdvisors: "GetServiceAdvisors",
      GetAdvisorPictures: "GetAdvisorPictures",
      GetAppointmentSlots: "GetAppointmentSlots",
      CreateServiceBooking: "CreateServiceBooking"
    }
  },
  CustomerVehicle: {
    XFunctionsKey: window.APP_DEPL_VAR.CustomerVehicleServiceKey,
    Url: window.APP_DEPL_VAR.CustomerVehicleServiceUrl,
    Endpoint: {
      DismissVehicleOwnership: "DismissVehicleOwnership",
      UpdateCustomerContact: "UpdateCustomerContact",
      CreateServiceBooking: "CreateServiceBooking"
    }
  },
  DealerConfiguration: {
    XFunctionsKey: window.APP_DEPL_VAR.DealerConfigurationServiceKey,
    Url: window.APP_DEPL_VAR.DealerConfigurationServiceUrl
  },
  VehicleMaintenance: {
    XFunctionsKey: window.APP_DEPL_VAR.VehicleMaintenanceServiceKey,
    Url: window.APP_DEPL_VAR.VehicleMaintenanceServiceUrl,
    Endpoint: {
      GetRecommendedServices: "GetRecommendedServices"
    }
  },
  GoogleService: {
    Key: window.APP_DEPL_VAR.GoogleServiceKey
  }
};
