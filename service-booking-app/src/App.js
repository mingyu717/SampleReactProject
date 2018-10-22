import React, { Component } from "react";
import "assets/theme.css"; //import any css here
import "assets/css/main.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import WelcomePage from "containers/WelcomePage";
import CheckCarDetailsPage from "containers/CheckCarDetailsPage";
import SelectServicesPage from "containers/SelectServicesPage";
import AppointmentPage from "containers/AppointmentPage";
import ReviewPage from "containers/ReviewPage";
import ConfirmationPage from "containers/ConfirmationPage";
import NotOwnVehiclePage from "containers/NotOwnVehiclePage";
import ContactInformation from "containers/ContactInformationPage";
import NotFoundPage from "containers/NotFoundPage";
import ErrorBoundary from "components/ErrorBoundary";
import withTracker from "utils/withTracker";

class App extends Component {
  render() {
    return (
      <div className="app">
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route exact path="/" component={withTracker(WelcomePage)} />
              <Route
                exact
                path="/bookService/carDetails"
                component={withTracker(CheckCarDetailsPage)}
              />
              <Route
                exact
                path="/bookService/selectServices"
                component={withTracker(SelectServicesPage)}
              />
              <Route
                exact
                path="/bookService/appointment"
                component={withTracker(AppointmentPage)}
              />
              <Route
                exact
                path="/bookService/review"
                component={withTracker(ReviewPage)}
              />
              <Route
                exact
                path="/bookService/confirmation"
                component={withTracker(ConfirmationPage)}
              />
              <Route
                exact
                path="/bookService/notOwnVehicle"
                component={withTracker(NotOwnVehiclePage)}
              />
              <Route
                exact
                path="/bookService/contactInformation"
                component={withTracker(ContactInformation)}
              />
              <Route exact path="/404" component={withTracker(NotFoundPage)} />
              <Redirect to="/404" />
            </Switch>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
