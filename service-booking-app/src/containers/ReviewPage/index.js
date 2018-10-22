import React, { Component } from "react";
import StepHeader from "components/Header/StepHeader";
import AppointmentReview from "containers/ReviewPage/AppointmentReview";
import ServiceReview from "containers/ReviewPage/ServiceReview";
import Disclaimer from "containers/ReviewPage/Disclaimer";
import CheckContactInfo from "containers/ReviewPage/CheckContactInfo";
import ActionButton from "containers/ReviewPage/ActionButton";
import { fetchApi } from "utils/apiFetchWrapper";
import { ApiSource, Api } from "constants/api";
import Enums from "constants/enum";
import ReactDOM from "react-dom";
import WithLoader from "components/WithLoader/index";
import WithErrorPage from "components/WithErrorPage";
export default class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.checkContactRef = React.createRef();

    this.state = {
      appointment: {
        timeSlot: sessionStorage.getItem("timeSlot"),
        jobDate: sessionStorage.getItem("jobDate"),
        advisorName: sessionStorage.getItem("advisorName"),
        transportMethodName: sessionStorage.getItem("transportMethodName")
      },
      contact: {
        firstName: sessionStorage.getItem("firstName"),
        surname: sessionStorage.getItem("surname"),
        email: sessionStorage.getItem("email"),
        phoneNumber: sessionStorage.getItem("phoneNumber")
      },
      wipNo: null,
      isSubmitting: false,
      isError: false
    };
  }

  onClickBookBtn = () => {
    this.setState({ isSubmitting: true });
    this.createServiceBooking();
  };

  onReceiveResponse = response => {
    sessionStorage.setItem("wipNo", response.WipNo);
    window.location.assign("/bookService/confirmation");
  };

  onError = () => {
    this.setState({
      isSubmitting: false,
      isError: true
    });
  };

  createServiceBooking = () => {
    const dealerId = sessionStorage.getItem("dealerId");
    const customerNo = sessionStorage.getItem("customerNo");
    const vehicleNo = sessionStorage.getItem("vehicleNo");
    const jobDate = sessionStorage.getItem("jobDate");
    const distanceBasedServiceCode = sessionStorage.getItem(
      "distanceBasedServiceCode"
    );
    const additionalServicesCodes = JSON.parse(
      sessionStorage.getItem("additionalServiceCodes")
    );
    const transportMethod = sessionStorage.getItem("transportMethod");
    const advisorID = sessionStorage.getItem("advisorId");
    const advisorDropOffTimeCode = sessionStorage.getItem("timeSlot");

    const data = {
      DealerId: dealerId,
      CustomerNo: customerNo,
      VehicleNo: vehicleNo,
      JobDate: jobDate,
      Jobs: [distanceBasedServiceCode, ...additionalServicesCodes].map(
        item => ({
          JobCode: item
        })
      ),
      TransportMethod: transportMethod,
      AdvisorID: advisorID,
      AdvisorDropOffTimeCode: advisorDropOffTimeCode
    };

    fetchApi(
      ApiSource.CustomerVehicle,
      Api.CustomerVehicle.Endpoint.CreateServiceBooking,
      data
    )
      .then(response => {
        this.onReceiveResponse(response);
      })
      .catch(() => {
        this.onError();
      });
  };

  onSetValue = (name, value) => {
    this.setState({ contact: { ...this.state.contact, [name]: value } });
  };
  componentDidMount() {
    const hash = this.props.location.hash;
    if (hash === "#checkcontact") {
      const domNode = ReactDOM.findDOMNode(this.checkContactRef.current);
      domNode.scrollIntoView();
    }
  }
  disableBookNow = () => {
    this.setState({ isBookNowEnabled: false });
  };

  onSetValue = (name, value) => {
    this.setState({ contact: { ...this.state.contact, [name]: value } });
  };

  render() {
    const { appointment, contact, isSubmitting, isError } = this.state;

    return (
      <WithErrorPage isError={isError} buttonText="Back Home">
        <WithLoader isLoading={isSubmitting} message="Submitting">
          <StepHeader
            headerTitle="Review"
            goBackLink="/bookService/appointment"
            stepNumber={Enums.ProgressBarStepNumber.Review}
          />
          <main>
            <section className="full-width">
              <AppointmentReview data={appointment} />
              <ServiceReview />
              <Disclaimer />
              <CheckContactInfo
                data={contact}
                checkContactRef={this.checkContactRef}
              />
            </section>
            <section>
              <ActionButton
                onClick={this.onClickBookBtn}
                isEnabled={!isSubmitting}
              />
            </section>
          </main>
        </WithLoader>
      </WithErrorPage>
    );
  }
}
