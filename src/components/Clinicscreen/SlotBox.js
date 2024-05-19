import axios from "../../axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { deleteClinic } from "../../api/clinic";
import useAppContext from "../context/AppContext";
import Spinner from "../Spinner";
import { deleteAvailability } from "../../api/doctor";

const SlotBox = ({ slot, clinic, serial = 1, setDeletedSlotId = () => {} }) => {
  console.log("SlotBox", clinic);
  const navigate = useNavigate();
  const { openSnackbar } = useAppContext();

  const [loadingDelete, setLoadindDelete] = useState(false);

  const onClickEdit = () => {
    navigate("/clinicdetails", {
      state: { clinic, isUpdateClinic: true, step: 2, availability: slot },
    });
  };

  const onClickDelete = async () => {
    setLoadindDelete(true);
    const response = await deleteAvailability(clinic?._id, slot?._id);
    if (response?.status === 200) {
      setDeletedSlotId(slot?._id);
      openSnackbar({
        severity: "success",
        message: response?.data?.message || "Slot deleted successfully",
      });
      // toast("Slot Deleted Succesfully", {
      // 	position: "top-right",
      // 	autoClose: 2000,
      //   });
    } else {
      openSnackbar({
        severity: "error",
        message: response?.data?.message || "Error deleting slot",
      });
    }
    setLoadindDelete(false);
  };

  return (
    <div className="appt_card">
      <div>
        <div className="appt_slot-num">Slot {serial?.toString()}</div>
        <h6 className="appt_time">
          {moment(slot?.startTime, "hh:mm").format("hh:mm A")} -{" "}
          {moment(slot?.endTime, "hh:mm").format("hh:mm A")}
        </h6>
        <div className="appt_days">
          <ul>
            {slot?.days.map((day, i) => (
              <li key={i}>{day.substring(0, 3)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button className="slot_edit_card" onClick={onClickEdit}>
          Edit
        </button>
        <button className="slot_delete_card" onClick={onClickDelete}>
          {loadingDelete ? <Spinner color={"#ff5555"} /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default SlotBox;
