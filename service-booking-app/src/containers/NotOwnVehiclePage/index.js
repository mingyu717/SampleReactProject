import React, { Component } from "react";
import DealerLogo from "assets/img/vw-logo.png";
import Header from "containers/WelcomePage/Header";
import SvgBackground from "containers/WelcomePage/SvgBackground";
import HeroImage from "containers/WelcomePage//HeroImage";
import HomeHeroImage from "assets/img/vw_advance_service_logo.png";
import NotOwnVehicleMessage from "containers/NotOwnVehiclePage/NotOwnVehicleMessage";

export default class NotOwnVehiclePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: sessionStorage.getItem("firstName"),
      dealerPhoneNumber: sessionStorage.getItem("dealerPhoneNumber"),
      dealerName: sessionStorage.getItem("dealerName")
    };
  }

  render() {
    const { dealerName, userName, dealerPhoneNumber } = this.state;
    return (
      <div className="home">
        <header>
          <Header logo={DealerLogo} dealerName={dealerName} />
        </header>
        <main>
          <SvgBackground />
          <HeroImage img={HomeHeroImage} />
          <section className="l-grid grid-gap-8">
            <NotOwnVehicleMessage
              userName={userName}
              dealerPhoneNumber={dealerPhoneNumber}
            />
          </section>
        </main>
      </div>
    );
  }
}
