import React from "react";
import { mount } from "enzyme";
import CartList from "../CartList";

const unDeletableData = [
  {
    Name: "Generic VW Service",
    ServiceCode: "71",
    ProductCode: "SVW",
    Description: "",
    ServiceTime: "3.00",
    Price: "345.00"
  }
];

const deletableData = [
  {
    Name: "Replacement",
    ServiceCode: "72",
    ProductCode: "SVWW",
    Description: "",
    ServiceTime: "5.00",
    Price: "350.00"
  }
];

describe("<CartList /", () => {
  it("should not show price when isVisible is false", () => {
    const cartList = mount(
      <CartList
        unDeletableData={unDeletableData}
        deletableData={deletableData}
        isPriceVisible={false}
      />
    );
    expect(
      cartList.contains(<span className="text-small extra-bold">Total</span>)
    ).toEqual(false);
    expect(cartList.contains(<h4 className="extra-bold">$345.00</h4>)).toEqual(
      false
    );
  });

  it("should show price when isVisible is true", () => {
    const cartList = mount(
      <CartList
        unDeletableData={unDeletableData}
        deletableData={deletableData}
        isPriceVisible={true}
      />
    );

    expect(
      cartList.contains(<span className="text-small extra-bold">Total</span>)
    ).toEqual(true);
    expect(
      cartList.contains(<span className="extra-bold">$695.00</span>)
    ).toEqual(true);
  });
});
