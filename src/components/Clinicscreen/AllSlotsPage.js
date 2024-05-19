import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import SlotBox from "./SlotBox";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2vw",
    marginRight: "-50%",
    minHeight: "fit-content",
    minWidth: "fit-content",
    width: "80vw",
    transform: "translate(-50%, -50%)",
    background: "#fff",
  },
};

const AllSlotsPage = ({
  modalIsOpen,
  setmodalIsOpen,
  clinic,
  setDeletedSlotId,
}) => {
  console.log("AllSlotsPage", clinic);
  const navigate = useNavigate();

  function onClickCreateSlot() {
    navigate("/clinicdetails", { state: { step: 2, clinic } });
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setmodalIsOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="all_slot_page_header">Slot Availability</div>
      <div
        onClick={() => {
          setmodalIsOpen(false);
        }}
        className="all_slot_page_cross"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
            stroke="#232526"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.5 13.5L13.5 22.5"
            stroke="#232526"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5 13.5L22.5 22.5"
            stroke="#232526"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="all_slot_page">
        {clinic?.availabilities?.map((availability, index) => (
          <SlotBox
            key={availability._id}
            serial={index + 1}
            setDeletedSlotId={setDeletedSlotId}
            clinic={clinic}
            slot={availability}
          />
        ))}
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button
          style={{ bottom: "2vw" }}
          className="edit_btn_cta"
          onClick={onClickCreateSlot}
        >
          Create Slot
        </button>
      </div>
    </Modal>
  );
};

export default AllSlotsPage;
