import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";
import "react-dates/initialize";
import Enzyme from "enzyme";
import nodeFetch from "node-fetch";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.fetch = nodeFetch;
global.sessionStorage = sessionStorageMock;
global.APP_DEPL_VAR = {
  CustomerVehicleServiceUrl: "CustomerVehicleServiceUrl",
  CustomerVehicleServiceKey: "CustomerVehicleServiceKey",
  DealerConfigurationServiceUrl: "DealerConfigurationServiceUrl",
  DealerConfigurationServiceKey: "DealerConfigurationServiceKey",
  VehicleMaintenanceServiceUrl: "VehicleMaintenanceServiceUrl",
  VehicleMaintenanceServiceKey: "VehicleMaintenanceServiceKey",
  GoogleServiceKey: "GoogleServiceKey",
  SentryDSN: "SentryDSN",
  GATrackingId: "GATrackingId",
  Env: "Env"
};

Enzyme.configure({ adapter: new Adapter() });
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };
