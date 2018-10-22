import React from "react";

const ChooseAdvisor = props => {
  const {
    isVisible,
    advisorData,
    selectedAdvisorId,
    onSetSelectedAdvisorId
  } = props;
  const handleSelectChange = event => {
    onSetSelectedAdvisorId(event.target.value);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor="">Choose an Advisor</label>
      <select
        value={selectedAdvisorId}
        onChange={handleSelectChange}
        disabled={!advisorData}
      >
        <option value="" className="placeholder">
          Any advisor
        </option>
        {advisorData &&
          Object.keys(advisorData).map(advisorId => {
            const optionData = advisorData[advisorId];
            return (
              <option key={optionData.AdvisorID} value={optionData.AdvisorID}>
                {optionData.AdvisorName}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default ChooseAdvisor;
