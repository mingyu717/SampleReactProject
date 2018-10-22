import React from "react";
import Cleave from "cleave.js/react";

const MileageInputCard = props => {
  const digitsLength = 9;
  return (
    <div className="card">
      <label htmlFor="">Please enter approximate odometer (Optional)</label>
      <div className="suffixInput">
        <Cleave
          value={props.defaultValue}
          placeholder="ex.15,000"
          options={{ numeral: true, numeralIntegerScale: digitsLength }}
          onChange={event => props.onChange(event.target.rawValue)}
          type="text"
          pattern="\d*"
          inputMode="numeric"
        />
        <span className="suffix">km</span>
      </div>
    </div>
  );
};

export default MileageInputCard;
