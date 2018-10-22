import React from "react";
import iconWrechBlue from "assets/img/icon-wrench-blue.svg";
import iconWrechGrey from "assets/img/icon-wrench-grey.svg";
import iconOilBlue from "assets/img/icon-oil-blue.svg";
import iconOilGrey from "assets/img/icon-oil-grey.svg";
import TickSvg from "containers/SelectServicesPage/TickSvg";

const DetailAccordionToggle = props => {
  const { amount, isToggled, onClick, serviceType, icon, isEnable } = props;
  return (
    <a
      className={`icon-with-link ${isToggled ? "toggled" : ""} ${
        isEnable ? "" : "disable"
      }`}
      onClick={onClick}
    >
      <img src={isToggled || !isEnable ? icon.grey : icon.blue} alt="" />
      <p className="text-mini text-blue bold">
        {`${amount} ${serviceType}`}
        {isEnable && (
          <span
            className={`icon-arrow-down ${
              isToggled ? "grey reversed" : "blue"
            }`}
          />
        )}
      </p>
    </a>
  );
};

const ServiceDetailAccordionToggle = props => {
  const { data, isToggled, onClick } = props;
  const serviceType = "Services";
  const icon = { blue: iconWrechBlue, grey: iconWrechGrey };

  return (
    <DetailAccordionToggle
      amount={
        data && data.ServiceList && data.ServiceList
          ? data.ServiceList.length
          : ""
      }
      onClick={() => onClick(serviceType)}
      serviceType={serviceType}
      icon={icon}
      isToggled={isToggled}
      isEnable={data}
    />
  );
};

const ReplacementDetailAccordionToggle = props => {
  const { data, isToggled } = props;
  const serviceType = "Replacements";
  const icon = { blue: iconOilBlue, grey: iconOilGrey };

  return (
    <DetailAccordionToggle
      amount={
        data && data.ReplacementList && data.ReplacementList
          ? data.ReplacementList.length
          : ""
      }
      onClick={() => props.onClick(serviceType)}
      serviceType={serviceType}
      icon={icon}
      isToggled={isToggled}
      isEnable={data}
    />
  );
};

const ServiceDetailAccordionContent = props => {
  const { data } = props;
  if (!(data && Array.isArray(data) && data.length)) {
    return <div className="desc text-tiny center">No Description.</div>;
  }

  const TextOrderedList = data.map((itemData, index) => (
    <li key={index}>{itemData}</li>
  ));

  return (
    <div className="desc text-tiny">
      <ol>{TextOrderedList}</ol>
    </div>
  );
};

const AddToCartButton = props => {
  const { serviceCode, isSelected, onClick } = props;
  return (
    <div className="center">
      <a
        className={`radio-button ${isSelected ? "selected" : ""}`}
        onClick={() => onClick(serviceCode)}
      >
        <span className="tick-icon">
          <TickSvg />
        </span>
        <span className="text-small">
          {isSelected ? "Selected recommended service" : "Select this service"}
        </span>
      </a>
    </div>
  );
};

class DistanceBasedServiceItem extends React.Component {
  state = {
    isServiceDetailShown: false,
    isReplacementDetailShown: false
  };

  onClickToggle = option => {
    if (option === "Services") {
      this.setState({
        isServiceDetailShown: !this.state.isServiceDetailShown,
        isReplacementDetailShown: false
      });
    } else if (option === "Replacements") {
      this.setState({
        isServiceDetailShown: false,
        isReplacementDetailShown: !this.state.isReplacementDetailShown
      });
    }
  };

  render() {
    const { isServiceDetailShown, isReplacementDetailShown } = this.state;
    const { data, isSelected, onClickAddBtn } = this.props;
    const { Description, ServiceCode, Name } = data;
    return (
      <div className={`card ${isSelected ? "selected" : ""}`}>
        <div className="l-grid grid-gap-12 wrapper">
          <div className="card__title">
            <h2 className="-tight">{Name}</h2>
          </div>
          <div className="center">
            <ServiceDetailAccordionToggle
              onClick={this.onClickToggle}
              isToggled={isServiceDetailShown}
              data={Description}
            />
            <ReplacementDetailAccordionToggle
              onClick={this.onClickToggle}
              isToggled={isReplacementDetailShown}
              data={Description}
            />
          </div>
          {isServiceDetailShown && (
            <ServiceDetailAccordionContent data={Description} />
          )}
          {isReplacementDetailShown && (
            <ServiceDetailAccordionContent data={Description} />
          )}
          <AddToCartButton
            serviceCode={ServiceCode}
            isSelected={isSelected}
            onClick={onClickAddBtn}
          />
        </div>
      </div>
    );
  }
}

const DistanceBasedServiceList = props => {
  const { data, selectedService, onClickAddBtn } = props;
  if (data && !data.length) {
    return null;
  }

  const itemList = data.map((item, index) => {
    return (
      <DistanceBasedServiceItem
        key={index}
        data={item}
        isSelected={selectedService === item.ServiceCode}
        onClickAddBtn={onClickAddBtn}
      />
    );
  });

  return <div className="single-select-list">{itemList}</div>;
};

const DistanceBasedServicesWrapper = props => {
  const { data, selectedService, onSetSelectedService } = props;

  return (
    <section>
      <h3 className="text-center">Recommended Service Options</h3>
      <p className="text-tiny text-center">
        All of the basic services needed to keep your vehicle up to
        Manufacturer's specification
      </p>
      <DistanceBasedServiceList
        data={data}
        selectedService={selectedService}
        onClickAddBtn={onSetSelectedService}
      />
    </section>
  );
};

export default DistanceBasedServicesWrapper;
