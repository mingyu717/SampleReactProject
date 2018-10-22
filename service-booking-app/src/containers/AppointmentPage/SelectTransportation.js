import React from "react";

const TransportMethodOption = props => {
  const { data, selectedValue, onSelectChange } = props;
  return (
    <div key={data.OptionID}>
      <div className="radio">
        <input
          id={"radio-" + data.OptionID}
          name="radio"
          type="radio"
          value={data.OptionID}
          onChange={onSelectChange}
          checked={data.OptionID === selectedValue}
        />
        <label htmlFor={"radio-" + data.OptionID} className="radio-label">
          {data.OptionDisplayName}
        </label>
      </div>
      <p className="text-small">{data.OptionDescription}</p>
    </div>
  );
};

const SelectTransportation = props => {
  const { data, selectedValue, onSetSelectedValue, isVisible } = props;

  const onSelectChange = event => {
    onSetSelectedValue(event.target.value);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor="">Select Transportation</label>
      {data ? (
        Object.keys(data).map(optionId => {
          const optionData = data[optionId];
          return (
            <TransportMethodOption
              data={optionData}
              selectedValue={selectedValue}
              onSelectChange={onSelectChange}
            />
          );
        })
      ) : (
        <p>No available options.</p>
      )}
    </div>
  );
};

export default SelectTransportation;
