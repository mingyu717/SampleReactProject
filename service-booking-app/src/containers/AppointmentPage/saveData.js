export const saveData = data => {
  sessionStorage.setItem("transportMethod", data.selectedTransportMethod);
  sessionStorage.setItem(
    "transportMethodName",
    data.transportMethodData[data.selectedTransportMethod].OptionDisplayName
  );
  sessionStorage.setItem("jobDate", data.selectedDate);
  sessionStorage.setItem("timeSlot", data.selectedTimeSlot);
  sessionStorage.setItem("advisorId", data.selectedAdvisorId);
  if (data.selectedAdvisorId) {
    sessionStorage.setItem(
      "advisorName",
      data.advisorData[data.selectedAdvisorId].AdvisorName
    );
  }
};
