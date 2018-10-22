import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "../ErrorMessage";

const dealerName = "Test Dealer";
const dealerPhoneNumber = "+6421111111";

describe("<ErrorMessage />", () => {
  it("Invitation expired error message", () => {
    const errorMessage = "Invitation expired";
    const wrapper = shallow(
      <ErrorMessage
        errorMessage={errorMessage}
        dealerName={dealerName}
        dealerPhoneNumber={dealerPhoneNumber}
      />
    );
    expect(
      wrapper.containsMatchingElement([
        <p>
          Welcome to Service booking. Your invitation has expired, please
          contact Test Dealer on
          <a href={"tel:+6421111111"} className="text-blue">
            +6421111111
          </a>
        </p>
      ])
    ).toBeTruthy();
  });

  it("default error message with dealer information", () => {
    const errorMessage = "Not found";
    const wrapper = shallow(
      <ErrorMessage
        errorMessage={errorMessage}
        dealerName={dealerName}
        dealerPhoneNumber={dealerPhoneNumber}
      />
    );
    expect(
      wrapper.containsMatchingElement([
        <p>
          Welcome to Service booking. We are not able to process your request,
          please contact
          <a href={"tel:+6421111111"} className="text-blue">
            +6421111111
          </a>
        </p>
      ])
    ).toBeTruthy();
  });

  it("default error message with no dealer information", () => {
    const errorMessage = "Not found";
    const wrapper = shallow(<ErrorMessage errorMessage={errorMessage} />);
    expect(
      wrapper.containsMatchingElement([
        <p>
          Welcome to Service booking. We are not able to process your request,
          please make sure the url was not modified from your message or email
        </p>
      ])
    ).toBeTruthy();
  });
});
