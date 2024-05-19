import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import DashboardNav from "../DashboardNav/DashboardNav";
import RequestModalSearch from "./RequestModalSearch";
import Requests from "./Requests";
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
const RequestExtendView = ({
  extendView,
  setExtendView,
  setSearch,
  search,
  setReloadAppointments,
}) => {
  return (
    <Modal
      isOpen={extendView}
      style={customStyles}
      onRequestClose={() => setExtendView(false)}
    >
      <RequestModalSearch search={search} setSearch={setSearch} />
      <Requests
        extended={true}
        expandsearchText={search}
        setReloadAppointments={setReloadAppointments}
      />
    </Modal>
  );
};

export default RequestExtendView;
