import React, { Component } from "react";
import StepHeader from "components/Header/StepHeader";
import DistanceBasedServices from "containers/SelectServicesPage/DistanceBasedServices";
import AdditionalServices from "containers/SelectServicesPage/AdditionalServices";
import ActionButton from "containers/SelectServicesPage/ActionButton";
import Enums from "constants/enum";
import fetchRecommendedServices from "./fetchRecommendedServices";
import ShoppingCartModal from "containers/ShoppingCart/ShoppingCartModal";
import { saveData } from "containers/SelectServicesPage/saveData";
import WithLoader from "components/WithLoader/index";
import WithErrorPage from "components/WithErrorPage";

export default class SelectServicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShoppingCartOpen: false,
      isLoading: true,
      isError: false,
      distanceBasedServiceData: [],
      selectedDistanceBasedService: "",
      additionalServiceData: [],
      selectedAdditionalServices: []
    };
  }

  onReceiveResponse = response => {
    const distanceBasedServices = response.DistanceBasedServices;
    const additionalServices = response.AdditionalServices;

    const distanceBasedServiceHistoryValue = sessionStorage.getItem(
      "distanceBasedServiceCode"
    );
    const distanceBasedServicesFirstValue =
      distanceBasedServices.length > 0
        ? distanceBasedServices[0].ServiceCode
        : "";
    const selectedDistanceBasedServiceInitialValue =
      distanceBasedServiceHistoryValue || distanceBasedServicesFirstValue;

    const stringifiedAdditionalServicesHistoryValues = sessionStorage.getItem(
      "additionalServiceCodes"
    );
    const selectedAdditionalServicesInitialValues = stringifiedAdditionalServicesHistoryValues
      ? JSON.parse(stringifiedAdditionalServicesHistoryValues)
      : [];

    this.setState({
      isLoading: false,
      distanceBasedServiceData: distanceBasedServices,
      additionalServiceData: additionalServices,
      selectedDistanceBasedService: selectedDistanceBasedServiceInitialValue,
      selectedAdditionalServices: selectedAdditionalServicesInitialValues
    });
  };

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true
    });
  };

  onSetSelectedDistanceBasedService = selectedDistanceBasedService => {
    this.setState({
      selectedDistanceBasedService
    });
  };

  onSetSelectedAdditionalServices = selectedAdditionalService => {
    const selectedAdditionalServices = this.state.selectedAdditionalServices;
    let newSelectedAdditionalServices = [];
    if (selectedAdditionalServices.includes(selectedAdditionalService)) {
      newSelectedAdditionalServices = selectedAdditionalServices.filter(
        item => item !== selectedAdditionalService
      );
    } else {
      newSelectedAdditionalServices = selectedAdditionalServices.concat(
        selectedAdditionalService
      );
    }

    this.setState({
      selectedAdditionalServices: newSelectedAdditionalServices
    });
  };

  onDeleteSelectedAdditionalService = toDeleteAdditionalService => {
    const selectedAdditionalServices = this.state.selectedAdditionalServices;
    const newSelectedAdditionalServices = selectedAdditionalServices.filter(
      item => item !== toDeleteAdditionalService
    );

    this.setState(() => ({
      selectedAdditionalServices: newSelectedAdditionalServices
    }));
  };

  openModal = () => {
    this.setState({ isShoppingCartOpen: true });
  };

  closeModal = () => {
    this.setState({ isShoppingCartOpen: false });
  };

  componentDidMount() {
    fetchRecommendedServices()
      .then(response => this.onReceiveResponse(response))
      .catch(() => this.onError());
  }

  render() {
    const {
      isShoppingCartOpen,
      isLoading,
      isError,
      distanceBasedServiceData,
      selectedDistanceBasedService,
      additionalServiceData,
      selectedAdditionalServices
    } = this.state;
    const itemAmount =
      (selectedDistanceBasedService ? 1 : 0) +
      selectedAdditionalServices.length;
    const selectedServicesData = {
      DistanceBasedServices: distanceBasedServiceData.filter(
        item => item.ServiceCode === selectedDistanceBasedService
      ),
      AdditionalServices: additionalServiceData.filter(item =>
        selectedAdditionalServices.includes(item.ServiceCode)
      )
    };

    return (
      <React.Fragment>
        <WithErrorPage isError={isError}>
          <StepHeader
            headerTitle="Select Services"
            goBackLink="/bookService/carDetails"
            stepNumber={Enums.ProgressBarStepNumber.SelectServices}
          >
            <a
              onClick={this.openModal}
              className="icon-shoppingCart shoppingCart-toggle"
            >
              <span className="shoppingCart__item">{itemAmount}</span>
            </a>
          </StepHeader>
          <main>
            <WithLoader isLoading={isLoading} isContentShown={false}>
              <DistanceBasedServices
                data={distanceBasedServiceData}
                selectedService={selectedDistanceBasedService}
                onSetSelectedService={this.onSetSelectedDistanceBasedService}
              />
              <AdditionalServices
                data={additionalServiceData}
                selectedServices={selectedAdditionalServices}
                onSetSelectedServices={this.onSetSelectedAdditionalServices}
              />
              <ActionButton
                onClick={() => saveData(this.state, selectedServicesData)}
                isEnabled={selectedDistanceBasedService}
              />
            </WithLoader>
          </main>
        </WithErrorPage>
        <ShoppingCartModal
          isOpen={isShoppingCartOpen}
          closeModal={this.closeModal}
          data={selectedServicesData}
          deleteService={this.onDeleteSelectedAdditionalService}
        />
      </React.Fragment>
    );
  }
}
