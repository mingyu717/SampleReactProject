import React from "react";
import { shallow } from "enzyme";
import WelcomePage from "../index";
import { saveDealerConfiguration, saveCustomerVehicle } from "../saveToStorage";

jest.mock("../saveToStorage");
jest.mock("utils/apiFetchWrapper");

describe("<WelcomePage />", () => {
  describe("a correct query string received", () => {
    const location = {
      search: "?d=1&cno=1&vno=1"
    };

    it("fetchCustomerVehicle & fetchDealerConfiguration should be called", () => {
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyFetchCustomerVehicle = jest.spyOn(
        wrapper.instance(),
        "fetchCustomerVehicle"
      );
      const spyFetchDealerConfiguration = jest.spyOn(
        wrapper.instance(),
        "fetchDealerConfiguration"
      );
      wrapper.instance().componentDidMount();
      expect(spyFetchCustomerVehicle).toHaveBeenCalled();
      expect(spyFetchDealerConfiguration).toHaveBeenCalled();
    });

    it("fetchDealerConfiguration should call onReceiveDealerConfigurationResponse", async () => {
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyOnReceiveResponse = jest.spyOn(
        wrapper.instance(),
        "onReceiveDealerConfigurationResponse"
      );
      expect.assertions(1);
      await wrapper.instance().fetchDealerConfiguration();
      expect(spyOnReceiveResponse).toHaveBeenCalled();
    });

    it("fetchCustomerVehicle should call onReceiveCustomerVehicleResponse", async () => {
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyOnReceiveResponse = jest.spyOn(
        wrapper.instance(),
        "onReceiveCustomerVehicleResponse"
      );
      expect.assertions(1);
      await wrapper.instance().fetchCustomerVehicle();
      expect(spyOnReceiveResponse).toHaveBeenCalled();
    });

    describe("on Receive Response of", () => {
      const location = {
        search: "?d=1&cno=1&vno=1"
      };
      const response = {
        userName: "userName"
      };

      it("DealerConfiguration should call saveDealerConfiguration and setState", () => {
        const wrapper = shallow(<WelcomePage location={location} />);
        const spySetState = jest.spyOn(wrapper.instance(), "setState");
        wrapper.instance().onReceiveDealerConfigurationResponse(response);
        expect(saveDealerConfiguration).toHaveBeenCalled();
        expect(spySetState).toHaveBeenCalled();
      });

      it("CustomerVehicle should call saveCustomerVehicle and setState", () => {
        const wrapper = shallow(<WelcomePage location={location} />);
        const spySetState = jest.spyOn(wrapper.instance(), "setState");
        wrapper.instance().onReceiveCustomerVehicleResponse(response);
        expect(saveCustomerVehicle).toHaveBeenCalled();
        expect(spySetState).toHaveBeenCalled();
      });
    });
  });

  describe("an query string with incorrect format received", () => {
    it("fetchCustomerVehicle & fetchDealerConfiguration should not be called", () => {
      const location = {
        search: "?d=1&cno=1"
      };
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyFetchCustomerVehicle = jest.spyOn(
        wrapper.instance(),
        "fetchCustomerVehicle"
      );
      const spyFetchDealerConfiguration = jest.spyOn(
        wrapper.instance(),
        "fetchDealerConfiguration"
      );
      wrapper.instance().componentDidMount();
      expect(spyFetchCustomerVehicle).not.toHaveBeenCalled();
      expect(spyFetchDealerConfiguration).not.toHaveBeenCalled();
    });
  });

  describe("a query string with invalid data received", () => {
    const location = {
      search: "?d=2&cno=2&vno=2"
    };

    it("fetchDealerConfiguration should catch error", async () => {
      let outputData = "";
      console["log"] = jest.fn(input => (outputData = input));
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyOnReceiveResponse = jest.spyOn(
        wrapper.instance(),
        "onReceiveDealerConfigurationResponse"
      );
      const spyOnReceiveResponseError = jest.spyOn(
        wrapper.instance(),
        "onReceiveDealerConfigurationError"
      );
      expect.assertions(2);
      await wrapper.instance().fetchDealerConfiguration();
      expect(spyOnReceiveResponse).not.toHaveBeenCalled();
      expect(spyOnReceiveResponseError).toHaveBeenCalled();

      // expect(outputData).toEqual("Failed to fetch: 404 Not Found");
    });

    it("fetchCustomerVehicle should call catch error", async () => {
      let outputData = "";
      console["log"] = jest.fn(input => (outputData = input));
      const wrapper = shallow(<WelcomePage location={location} />);
      const spyOnReceiveResponse = jest.spyOn(
        wrapper.instance(),
        "onReceiveCustomerVehicleResponse"
      );
      const spyOnReceiveResponseError = jest.spyOn(
        wrapper.instance(),
        "onReceiveCustomerVehicleError"
      );
      expect.assertions(2);
      await wrapper.instance().fetchCustomerVehicle();
      expect(spyOnReceiveResponse).not.toHaveBeenCalled();
      expect(spyOnReceiveResponseError).toHaveBeenCalled();

      // expect(outputData).toEqual("Failed to fetch: 404 Not Found");
    });
  });
});
