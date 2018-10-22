import React from "react";
import CartListItem from "./CartListItem";

const CartList = props => {
  const {
    unDeletableData,
    deletableData,
    isPriceVisible,
    deleteService
  } = props;
  const data = [...unDeletableData, ...deletableData];
  const totalPrice = data
    .map(item => Number(item.Price))
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

  if (data.length <= 0) {
    return (
      <div className="cart-list card card-full-width">
        <div className="list__item">
          <h4 className="bold">Your Shopping Cart is empty.</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-list card card-full-width">
      {unDeletableData.map(item => (
        <CartListItem
          key={item.ServiceCode}
          data={item}
          isPriceVisible={isPriceVisible}
          isDeletable={false}
          onClickRemoveBtn={() => {}}
        />
      ))}
      {deletableData.map(item => (
        <CartListItem
          key={item.ServiceCode}
          data={item}
          isPriceVisible={isPriceVisible}
          isDeletable={true}
          onClickRemoveBtn={deleteService}
        />
      ))}
      {isPriceVisible && (
        <div className="list__item">
          <span className="text-small extra-bold">Total</span>
          <span className="extra-bold">${totalPrice}</span>
        </div>
      )}
    </div>
  );
};

export default CartList;
