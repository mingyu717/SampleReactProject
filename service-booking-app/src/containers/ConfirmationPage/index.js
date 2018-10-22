import React from "react";
import ConfirmationHeading from "containers/ConfirmationPage/ConfirmationHeading";
import ConfirmationSummary from "containers/ConfirmationPage/ConfirmationSummary";
import DealershipLocation from "containers/ConfirmationPage/DealershipLocation";

class ConfirmationPage extends React.Component {
  state = {
    headingData: {
      firstName: sessionStorage.getItem("firstName"),
      wipNo: sessionStorage.getItem("wipNo")
    },

    summaryData: {
      timeSlot: sessionStorage.getItem("timeSlot"),
      jobDate: sessionStorage.getItem("jobDate"),
      vehicleDesc: sessionStorage.getItem("modelName"),
      advisorName: sessionStorage.getItem("advisorName"),
      transportMethodName: sessionStorage.getItem("transportMethodName"),
      dealerName: sessionStorage.getItem("dealerName"),
      dealerAddress: sessionStorage.getItem("dealerAddress")
    },

    dealerData: {
      dealerName: sessionStorage.getItem("dealerName"),
      dealerAddress: sessionStorage.getItem("dealerAddress"),
      longitude: sessionStorage.getItem("longitude"),
      latitude: sessionStorage.getItem("latitude"),
      dealerPhoneNumber: sessionStorage.getItem("dealerPhoneNumber")
    }
  };

  render() {
    const { headingData, summaryData, dealerData } = this.state;

    return (
      <div>
        <ConfirmationHeading data={headingData} />
        <main>
          <section className="full-width">
            <ConfirmationSummary data={summaryData} />
            <DealershipLocation data={dealerData} />
          </section>
        </main>
      </div>
    );
  }
}

export default ConfirmationPage;
