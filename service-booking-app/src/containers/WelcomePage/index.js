import React, { Component } from "react";
import DealerLogo from "assets/img/vw-logo.png";
import HomeHeroImage from "assets/img/vw_advance_service_logo.png";
import { ApiSource } from "constants/api";
import { fetchApi } from "utils/apiFetchWrapper";
import QueryStringJS from "query-string";
import ActionButton from "./ActionButton";
import WelcomeMessage from "./WelcomeMessage";
import SvgBackground from "./SvgBackground";
import Header from "./Header";
import HeroImage from "./HeroImage";
import { saveDealerConfiguration, saveCustomerVehicle } from "./saveToStorage";
import ErrorMessage from "./Error";
import ExistingBooking from "./ExistingBooking";
import WithLoader from "components/WithLoader";
import WithErrorPage from "components/WithErrorPage";

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingDealerConfiguration: false,
      isDealerConfigurationError: false,
      isFetchingCustomerVehicle: false,
      isCustomerVehicleError: false,
      customerVehicleErrorMessage: "",
      dealerName: "",
      dealerPhoneNumber: "",
      userName: "",
      existingBooking: ""
    };
  }

  onReceiveDealerConfigurationResponse = response => {
    this.setState({
      isFetchingDealerConfiguration: false,
      dealerName: response.DealerName,
      dealerPhoneNumber: response.PhoneNumber
        ? response.PhoneNumber.trim()
        : response.PhoneNumber
    });
    saveDealerConfiguration(response);
  };

  onReceiveDealerConfigurationError = () => {
    this.setState({
      isFetchingDealerConfiguration: false,
      isDealerConfigurationError: true
    });
  };

  onReceiveCustomerVehicleResponse = response => {
    this.setState({
      isFetchingCustomerVehicle: false,
      userName: response.FirstName,
      existingBooking: response.ExistingBooking
    });
    saveCustomerVehicle(response);
  };

  onReceiveCustomerVehicleError = error => {
    this.setState({
      isFetchingCustomerVehicle: false,
      isCustomerVehicleError: true,
      customerVehicleErrorMessage: error.message
    });
  };

  fetchDealerConfiguration = dealerId => {
    const endpoint = `dealers/${dealerId}`;
    this.setState({
      isFetchingDealerConfiguration: true
    });
    return fetchApi(ApiSource.DealerConfiguration, endpoint)
      .then(response => this.onReceiveDealerConfigurationResponse(response))
      .catch(e => this.onReceiveDealerConfigurationError(e));
  };

  fetchCustomerVehicle = (dealerId, customerNo, vehicleNo) => {
    const endpoint = `dealers/${dealerId}/customers/${customerNo}/vehicles/${vehicleNo}`;
    this.setState({
      isFetchingCustomerVehicle: true
    });
    return fetchApi(ApiSource.CustomerVehicle, endpoint)
      .then(response => this.onReceiveCustomerVehicleResponse(response))
      .catch(e => this.onReceiveCustomerVehicleError(e));
  };

  parseQueryString = queryString => {
    const queryStringLowerCase = queryString.toLowerCase();
    const { d, cno, vno } = QueryStringJS.parse(queryStringLowerCase);
    return d && cno && vno
      ? { dealerId: d, customerNo: cno, vehicleNo: vno }
      : null;
  };

  componentDidMount() {
    const queryString = this.props.location.search;
    const parsedQueryString = this.parseQueryString(queryString);
    if (!parsedQueryString) {
      this.setState({
        isDealerConfigurationError: true
      });
    } else {
      sessionStorage.clear();
      sessionStorage.setItem("queryString", queryString);
      this.fetchDealerConfiguration(parsedQueryString.dealerId);
      this.fetchCustomerVehicle(
        parsedQueryString.dealerId,
        parsedQueryString.customerNo,
        parsedQueryString.vehicleNo
      );
    }
  }

  render() {
    const {
      isFetchingDealerConfiguration,
      isDealerConfigurationError,
      isFetchingCustomerVehicle,
      isCustomerVehicleError,
      customerVehicleErrorMessage,
      dealerName,
      dealerPhoneNumber,
      userName,
      existingBooking
    } = this.state;
    const isLoading =
      !isFetchingDealerConfiguration && !isFetchingCustomerVehicle;
    const isError =
      isDealerConfigurationError || isCustomerVehicleError || existingBooking;
    const mainSection = () => {
      if (isCustomerVehicleError) {
        return (
          <ErrorMessage
            errorMessage={customerVehicleErrorMessage}
            dealerName={dealerName}
            dealerPhoneNumber={dealerPhoneNumber}
          />
        );
      }

      if (existingBooking)
        return (
          <ExistingBooking
            existingBooking={existingBooking}
            dealerName={dealerName}
            dealerPhoneNumber={dealerPhoneNumber}
          />
        );

      return <WelcomeMessage userName={userName} />;
    };

    return (
      <WithLoader isLoading={!isLoading}>
        <WithErrorPage isError={isDealerConfigurationError} buttonText={null}>
          <div className="home">
            <header>
              <Header dealerName={dealerName} logo={DealerLogo} />
            </header>
            <main>
              <SvgBackground />
              <HeroImage img={HomeHeroImage} />
              <section className="l-grid grid-gap-8">{mainSection()}</section>
              <section>
                <ActionButton isEnabled={isLoading && !isError} />
              </section>
            </main>
          </div>
        </WithErrorPage>
      </WithLoader>
    );
  }
}
