import React from "react";

class Disclaimer extends React.Component {
  state = {
    isOpen: false
  };
  onClickTitle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div>
        <div className="accordion">
          <div className="accordion__container">
            <a className="toggle" onClick={this.onClickTitle}>
              Disclaimer
            </a>
            {this.state.isOpen && (
              <div className="inner">
                <p>
                  The Dealership will endeavour to ensure that all your booking
                  requests are met. However, on rare occasions, we reserve the
                  right to amend aspects of your booking. If this occurs you
                  will be notified by one of our Service Advisors in advance of
                  your booking. Price information will be provided at your
                  appointment.
                </p>
                <p>
                  The Dealership collects personal information from you in order
                  to provide you with confirmation and updates about your
                  booking.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Disclaimer;
