import React from "react";
import Modal from "react-modal";
import Appointments from "./Appointments";
import RequestModalSearch from "../Request/RequestModalSearch";
import { useState } from "react";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "750px",
    padding: "20px",
    background: "#F4F4F4",
    borderRadius: "10px",
    position: "relative",
  },
};
const AppointmentExtendView = ({
  extendView,
  setExtendView,
  search,
  setSearch,
}) => {
  return (
    <Modal
      isOpen={extendView}
      style={customStyles}
      onRequestClose={() => setExtendView(false)}
    >
      <RequestModalSearch setSearch={setSearch} search={search} />
      <Appointments
        extended={true}
        viewallcta="false"
        expandsearchText={search}
      />
    </Modal>
  );
};

export default AppointmentExtendView;
