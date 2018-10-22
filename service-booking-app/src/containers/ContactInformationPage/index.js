import React, { Component } from "react";
import { Redirect } from "react-router";
import Header from "components/Header/Header";
import ContactInformationForm from "containers/ContactInformationPage/ContactInformationForm";
import {
  updateCustomerContact,
  saveData,
  validation
} from "containers/ContactInformationPage/actions";
import WithLoader from "components/WithLoader/index";
import WithErrorPage from "components/WithErrorPage";
export default class ContactInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isSubmitted: false,
      isError: false,
      data: {
        firstName: sessionStorage.getItem("firstName"),
        firstNameError: false,
        surname: sessionStorage.getItem("surname"),
        surnameError: false,
        email: sessionStorage.getItem("email"),
        emailError: false,
        phoneNumber: sessionStorage.getItem("phoneNumber"),
        additionalComments: ""
      }
    };
  }

  onSetValue = (name, value) => {
    let data = { ...this.state.data, [name]: value };
    switch (name) {
      case "firstName":
        data.firstNameError = !validation.isNotEmpty(value);
        break;
      case "surname":
        data.surnameError = !validation.isNotEmpty(value);
        break;
      case "email":
        data.emailError =
          validation.isNotEmpty(value) && !validation.isEmail(value);
        break;
      default:
        break;
    }
    this.setState({ data: data });
  };

  onError = () => {
    this.setState({
      isSubmitting: false,
      isError: true
    });
  };

  handleSubmit = () => {
    this.setState({ isSubmitting: true });
    updateCustomerContact(
      {
        ...this.state.data,
        dealerId: sessionStorage.getItem("dealerId"),
        customerNo: sessionStorage.getItem("customerNo")
      },
      () => {
        saveData(this.state.data);
        this.setState({ isSubmitted: true });
      }
    ).catch(() => {
      this.onError();
    });
  };

  render() {
    const { data, isSubmitted, isSubmitting, isError } = this.state;

    if (isSubmitted) {
      return (
        <Redirect
          push
          to={{
            pathname: "/bookService/review"
          }}
        />
      );
    }
    return (
      <WithErrorPage isError={isError} buttonText={null}>
        <WithLoader isLoading={isSubmitting} message="Submitting">
          <Header
            headerTitle="Your Contact Information"
            goBackLink="/bookService/review#checkcontact"
          />
          <main>
            <section>
              <ContactInformationForm
                data={data}
                onSetValue={this.onSetValue}
                handleSubmit={this.handleSubmit}
              />
            </section>
          </main>
        </WithLoader>
      </WithErrorPage>
    );
  }
}
