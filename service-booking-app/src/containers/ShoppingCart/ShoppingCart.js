import React from "react";
import CarDetail from "components/CarDetail/CarDetail";
import CartList from "components/ShoppingCart/CartList";
import Header from "./Header";

const ShoppingCart = props => {
  const { closeModal, deleteService, data } = props;
  const distanceBasedServiceData = data.DistanceBasedServices;
  const additionalServiceData = data.AdditionalServices;

  const carDetailData = {
    modelYear: sessionStorage.getItem("modelYear"),
    modelName: sessionStorage.getItem("modelName"),
    mileage: sessionStorage.getItem("mileage")
  };
  const isPriceVisible = JSON.parse(
    sessionStorage.getItem("isPriceVisible") || null
  );

  return (
    <div className="cart">
      <Header goBack={closeModal} />
      <CarDetail data={carDetailData} />
      <CartList
        unDeletableData={distanceBasedServiceData}
        deletableData={additionalServiceData}
        isPriceVisible={isPriceVisible}
        deleteService={deleteService}
      />
    </div>
  );
};

export default ShoppingCart;
