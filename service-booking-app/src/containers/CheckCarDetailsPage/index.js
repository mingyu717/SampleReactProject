import React, { Component } from "react";
import Header from "components/Header/Header";
import ActionButton from "containers/CheckCarDetailsPage/ActionButton";
import CarDetailsCard from "containers/CheckCarDetailsPage/CarDetails";
import MileageInputCard from "containers/CheckCarDetailsPage/MileageInput";
import { dismissVehicleOwner } from "containers/CheckCarDetailsPage/actions";
import WithLoader from "components/WithLoader/index";
import WithErrorPage from "components/WithErrorPage";
export default class CheckCarDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isError: false,
      mileage:
        sessionStorage.getItem("mileage") ||
        (sessionStorage.getItem("nextServiceMileage") > 0
          ? sessionStorage.getItem("nextServiceMileage")
          : null)
    };
    this.data = {
      detailData: {
        modelYear: sessionStorage.getItem("modelYear"),
        modelName: sessionStorage.getItem("modelName"),
        registrationNumber: sessionStorage.getItem("registrationNumber")
      },
      dealerId: sessionStorage.getItem("dealerId"),
      customerNo: sessionStorage.getItem("customerNo"),
      vehicleNo: sessionStorage.getItem("vehicleNo"),
      queryString: sessionStorage.getItem("queryString")
    };
  }

  onSetMileageValue = mileage => {
    this.setState({ mileage });
  };

  saveData = () => {
    sessionStorage.setItem(
      "mileage",
      this.state.mileage || sessionStorage.getItem("nextServiceMileage")
    );
  };

  onReceiveReportResponse = () => {
    this.props.history.push("/bookService/notOwnVehicle");
  };

  onError = () => {
    this.setState({
      isSubmitting: false,
      isError: true
    });
  };

  onClickReportBtn = () => {
    this.setState({ isSubmitting: true });
    const { dealerId, customerNo, vehicleNo } = this.data;
    dismissVehicleOwner(
      dealerId,
      customerNo,
      vehicleNo,
      this.onReceiveReportResponse
    ).catch(() => {
      this.onError();
    });
  };

  render() {
    const { detailData, queryString, isSubmitting, isError } = this.data;
    const { mileage } = this.state;

    return (
      <WithErrorPage isError={isError} buttonText={null}>
        <WithLoader isLoading={isSubmitting} message="Submitting">
          <Header
            headerTitle="Confirm Your Car's Details"
            goBackLink={"/" + queryString}
          />
          <main>
            <section>
              <CarDetailsCard
                detailData={detailData}
                onClickReport={this.onClickReportBtn}
              />
              <MileageInputCard
                defaultValue={mileage}
                onChange={this.onSetMileageValue}
              />
              <ActionButton
                onClick={this.saveData}
                isEnabled={mileage && !isNaN(mileage) && mileage > 0}
              />
            </section>
          </main>
        </WithLoader>
      </WithErrorPage>
    );
  }
}
