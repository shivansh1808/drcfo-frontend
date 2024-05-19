import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import "./Availability.scss";
import { useLocation, useNavigate } from "react-router-dom";
import SlotCreatedModal from "../Clinicscreen/SlotCreatedModal";
import cross from "../../assets/images/addcircle.png";
import AvailabilityCard from "./AvailabilityCard";
import { createAvailability, updateAvailability } from "../../api/doctor";
import useAppContext from "../context/AppContext";

export const initialState = {
  availability: {
    clinicId: "",
    days: [],
    startTime: "10:00",
    endTime: "11:00",
    maxAppointments: 0,
  },
};

const Availability = ({ clinic, isUpdateClinic, availability }) => {
  const { setSnackbar } = useAppContext();
  const navigate = useNavigate();

  // console.log("editAvailability", availability);

  const [availabilities, setAvailabilities] = useState([
    availability ?? initialState.availability,
  ]);
  const [appointments, setAppointments] = useState([]);
  const [slotsCount, setSlotsCount] = useState(
    availability?.maxAppointments || 0
  );

  function onChangeSlotsCount(e) {
    setSlotsCount(e.target.value);
  }

  async function onClickSubmit(e) {
    e.preventDefault();

    if (availability == null) {
      const availabilityData = {
        ...availabilities[0],
        clinicId: clinic?._id,
        maxAppointments: slotsCount,
      };
      // console.log("onClickSubmit", availabilityData);
      const response = await createAvailability(availabilityData);
      if (response?.status === 200) {
        navigate(isUpdateClinic ? "/dashboard/clinicscreen" : "/dashboard");
      } else {
        setSnackbar({
          open: true,
          message: response?.data?.message || "Could not create availability",
          severity: "error",
          duration: 6000,
        });
      }
    } else {
      const { slots, softDelete, _id, ...restAvailability } = availabilities[0];

      const availabilityData = {
        ...restAvailability,
        clinicId: clinic?._id,
        availabilityId: availability?._id,
        maxAppointments: slotsCount,
      };
      const response = await updateAvailability(availabilityData);
      if (response?.status === 200) {
        navigate(availability ? "/dashboard/clinicscreen" : "/dashboard");
        setSnackbar({
          open: true,
          message: "Availability updated successfully",
          severity: "success",
          duration: 6000,
        });
      } else {
        setSnackbar({
          open: true,
          message: response?.data?.message || "Could not create availability",
          severity: "error",
          duration: 6000,
        });
      }
    }
  }

  function onClickAddMoreAvailability() {}

  return (
    <form>
      <div
        id="slots_collector"
        className="availability_form container d-flex justify-content-center flex-column"
      >
        <h1>Availablity</h1>
        <p>It’s going to take only few minutes</p>
        {availabilities?.map((availability, i) => (
          <AvailabilityCard
            key={i}
            index={i}
            availabilities={availabilities}
            setAvailabilities={setAvailabilities}
            isUpdateClinic={isUpdateClinic}
          />
        ))}

        <div className="d-flex justify-content-center  flex-column ">
          <h3 className="slot_num_header">
            How many Appointment do you want in one hour?
          </h3>
          <div className="d-flex justify-content-center">
            <input
              className="slots_num"
              type="number"
              defaultValue={slotsCount}
              placeholder="Enter the number of appointment (eg. 20)"
              onChange={onChangeSlotsCount}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2">
          <button
            className="create_slot_btn"
            type="submit"
            onClick={onClickSubmit}
          >
            Create Availability
          </button>
        </div>
        <div>
          <div className="w-75 mx-auto d-flex flex-wrap justify-content-center">
            {appointments.map((appointment, i) => (
              <AppointmentCard key={i} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
      {/* <SlotCreatedModal modalIsOpen={slotSuccess} /> */}
    </form>
  );
};

export default Availability;
