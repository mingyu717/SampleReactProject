import React from "react";
import { Link } from "react-router-dom";
import CarDetail from "components/CarDetail/CarDetail";
import CartList from "components/ShoppingCart/CartList";

const ServiceReview = () => {
  const carDetailData = {
    modelYear: sessionStorage.getItem("modelYear"),
    modelName: sessionStorage.getItem("modelName"),
    mileage: sessionStorage.getItem("mileage")
  };
  const selectedServicesData = JSON.parse(
    sessionStorage.getItem("selectedServicesData") || null
  );
  const isPriceVisible = JSON.parse(
    sessionStorage.getItem("isPriceVisible") || null
  );
  return (
    <React.Fragment>
      <h3 className="text-center">Service Review</h3>
      <div className="card card-full-width">
        <div className="cart">
          <CarDetail data={carDetailData} />
          <CartList
            unDeletableData={selectedServicesData || []}
            deletableData={[]}
            isPriceVisible={isPriceVisible}
            deleteService={null}
          />
        </div>
        <div className="text-center">
          <Link
            to="/bookService/selectServices"
            className="button button-medium button-secondary secondary-blue "
          >
            Edit
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceReview;
