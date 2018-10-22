import React from "react";
import iconWrenchGrey from "assets/img/icon-wrench-grey.svg";
import ShoppingCartSvg from "containers/SelectServicesPage/ShoppingCartSvg";
import TickSvg from "containers/SelectServicesPage/TickSvg";

const AdditionalServiceItem = props => {
  const { title, isSelected, onClickAddToCartButton } = props;
  return (
    <a className="card" onClick={onClickAddToCartButton}>
      <img className="title-icon" src={iconWrenchGrey} alt="" />
      <h4 className="title">{title}</h4>
      <div className="add-to-cart-button">
        {isSelected ? (
          <TickSvg key={"tick"} />
        ) : (
          <ShoppingCartSvg key={"shoppingCart"} />
        )}
      </div>
    </a>
  );
};

const AdditionalServiceItemList = props => {
  const { data, selectedServices, onSetSelectedServices } = props;
  if (data.length === 0) {
    return (
      <div className="card">
        <img className="title-icon" src={iconWrenchGrey} alt="" />
        <h4 className="title">No options available.</h4>
      </div>
    ); //TODO: styling
  }

  const itemList = data.map((item, index) => (
    <AdditionalServiceItem
      key={index}
      title={item.Name}
      isSelected={selectedServices.includes(item.ServiceCode)}
      onClickAddToCartButton={() => onSetSelectedServices(item.ServiceCode)}
    />
  ));
  return <React.Fragment>{itemList}</React.Fragment>;
};

const AdditionalServices = props => {
  const { data, selectedServices, onSetSelectedServices } = props;
  return (
    <section className="additional-services">
      <h3 className="text-center">Please Select Additional Services</h3>
      <AdditionalServiceItemList
        data={data}
        selectedServices={selectedServices}
        onSetSelectedServices={onSetSelectedServices}
      />
    </section>
  );
};

export default AdditionalServices;
