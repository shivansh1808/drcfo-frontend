import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import "./ClinicTabs.css";
import directionicon from "../../assets/images/directionicon.png";
import map from "../../assets/images/map.png";
import SlotBox from "./SlotBox";
import axios from "../../axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AllSlotsPage from "./AllSlotsPage";
import useAppContext from "../context/AppContext";
import BackButton from "../BackButton";

// 62f63a38118331163b223776
const ClinicTabs = () => {
  const { rerenderTimeSlots } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const clinic = location.state?.clinic;

  console.log("ClinicTabs", clinic);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedSlotId, setDeletedSlotId] = useState("");

  function onClickEdit() {
    navigate("/clinicdetails", {
      state: { step: 1, clinic, isUpdateClinic: true },
    });
  }

  function onClickViewAll() {
    setModalIsOpen(true);
  }

  function handleDeletedSlotId() {
    if (deletedSlotId?.length) {
      const foundIndex = clinic?.availabilities?.findIndex(
        (availability) => availability._id === deletedSlotId
      );
      if (foundIndex > -1) {
        clinic?.availabilities?.splice(foundIndex, 1);
      }
      setDeletedSlotId("");
    }
  }

  function onClickBack() {
    navigate("/dashboard/clinicscreen");
  }

  useEffect(() => {
    handleDeletedSlotId();
  }, [deletedSlotId]);

  return (
    <div className="clinic_details_screen">
      <BackButton onClick={onClickBack} />
      <h1>Clinic Details</h1>
      <div className="clinic_details_card">
        <div className="clinic_details_card_left">
          <h5>{clinic.name}</h5>
          <p>Consultaion Fees</p>
          <h4>{`₹ ${clinic.fees} /-`}</h4>
          <p>Location</p>
          <h2 className="mb-2">
            {`${clinic?.address?.street}, ${clinic?.address?.area}, ${clinic?.address?.city}, ${clinic?.address?.pincode}, 
            ${clinic?.address?.state}`}
          </h2>
          <div className="mt-5 d-flex justify-content-end align-items-center">
            <button className="edit_btn_cta" onClick={onClickEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="clinic_details_card_right">
          <div className="">
            {clinic?.availabilities?.slice(0, 2)?.map((availability, index) => (
              <SlotBox
                key={availability._id}
                slot={availability}
                clinic={clinic}
                serial={index + 1}
                setDeletedSlotId={setDeletedSlotId}
              />
            ))}
          </div>
          <div className="d-flex justify-content-end me-4 mt-5">
            <button className="edit_btn_cta" onClick={onClickViewAll}>
              View All Slots
            </button>
            <AllSlotsPage
              modalIsOpen={modalIsOpen}
              setmodalIsOpen={setModalIsOpen}
              clinic={clinic}
              setDeletedSlotId={setDeletedSlotId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicTabs;

function ClinicTabsSkeleton() {
  return (
    <div className="clinic_details_screen">
      <h1>Clinic Details</h1>
      <div className="clinic_details_card">
        <div className="clinic_details_card_left">
          <h5>
            <Skeleton animation="wave" width="40%" />
          </h5>
          <p>Consultaion Fees</p>
          <h4>
            <Skeleton animation="wave" width="30%" />
          </h4>
          <p>Location</p>
          <h2 className="mb-2">
            <Skeleton animation="wave" width="50%" />
          </h2>
          <div className="mt-5 d-flex justify-content-end align-items-center">
            <button className="edit_btn_cta">Edit</button>
          </div>
        </div>
        <div className="clinic_details_card_right">
          <div className="">
            <div className="appt_card">
              <Skeleton animation="wave" width="100%" />
            </div>
          </div>
          <div className="d-flex justify-content-end me-4 mt-5">
            <button className="edit_btn_cta">View All Slots</button>
          </div>
        </div>
      </div>
    </div>
  );
}
