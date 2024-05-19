import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateAppointment.css";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import CreatedModal from "./CreatedModal";
import { createAppointment } from "../../api/appointment";
import useAppContext from "../context/AppContext";
import Spinner from "../Spinner";
import { getClinics } from "../../api/clinic";
import moment from "moment";
import brandlogo from "../../assets/images/brand_logo.svg";
const CreateAppointment = () => {
  const { openSnackbar } = useAppContext();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clinics, setClinics] = useState([]);

  function onClickNow(e) {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      time: moment().format("HH:mm"),
      date: moment().format("MM-DD-yyyy"),
    }));
  }

  function onClickClinic() {}

  function onChangeInput(name, value) {
    // console.log("onChangeInput", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    setLoading(true);
    // console.log("onFormSubmit", formData);
    const response = await createAppointment(formData);
    if (response?.status === 200) {
      setModalIsOpen(true);
    } else {
      openSnackbar({
        severity: "error",
        message: response?.data?.message || "Could not create appointment",
      });
    }
    setLoading(false);
  }

  async function onComponentLoad() {
    const response = await getClinics();
    if (response?.status === 200) {
      setClinics(response?.data?.data);
    } else {
      openSnackbar({
        severity: "error",
        message: response?.data?.message || "Could not get clinics",
      });
    }
  }

  useEffect(() => {
    onComponentLoad();
  }, []);

  return (
    <div className="createappointment_form">
      <Link to="/dashboard">
        <img src={brandlogo} alt="Logo" className="create_appointment_logo" />
      </Link>
      <div className="">
        <h1>Create Appointment</h1>
        <p>It’s going to take only few minutes</p>
        <form>
          <div className="createappointment_box">
            <div className="create_appointment_left_box">
              <div className="d-flex mt-5">
                {/* <label htmlFor="date">Appointment Date and Time</label> */}
                <div className="input_icons material_input">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disablePast
                      value={formData.date}
                      onChange={(date) =>
                        onChangeInput("date", moment(date).format("MM-DD-yyyy"))
                      }
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          className="text_field_material"
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "Select Date",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="input_icons material_input">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      ampm
                      value={moment(formData.time, "HH:mm").toISOString()}
                      onChange={(time) =>
                        onChangeInput("time", moment(time).format("HH:mm"))
                      }
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          className="text_field_material"
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "Select Time",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div className="material_input auto_select_date">
                  <button className="auto_select_date_cta" onClick={onClickNow}>
                    Now
                  </button>
                </div>
              </div>
              <div className="">
                <label htmlFor="name">Name*</label>
                <input
                  onChange={(e) => onChangeInput("name", e.target.value)}
                  type="text"
                  name="name"
                  className="createappointment_input"
                  placeholder="Enter Patient Name"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="gender">Gender</label>
                <div className="gender_box">
                  <input
                    onChange={(e) => onChangeInput("gender", e.target.value)}
                    className="checkbox-tools"
                    type="radio"
                    name="gender"
                    id="tool-1"
                    value="MALE"
                    required
                  />
                  <label className="for-checkbox-tools" htmlFor="tool-1">
                    Male
                  </label>
                  <input
                    onChange={(e) => onChangeInput("gender", e.target.value)}
                    className="checkbox-tools"
                    type="radio"
                    name="gender"
                    id="tool-2"
                    value="FEMALE"
                    required
                  />
                  <label className="for-checkbox-tools" htmlFor="tool-2">
                    Female
                  </label>
                  <input
                    className="checkbox-tools"
                    type="radio"
                    name="gender"
                    onChange={(e) => onChangeInput("gender", e.target.value)}
                    id="tool-3"
                    value="OTHER"
                    required
                  />
                  <label className="for-checkbox-tools" htmlFor="tool-3">
                    Others
                  </label>
                </div>
              </div>
              <div className="">
                <label htmlFor="email">Email Id*</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => onChangeInput("email", e.target.value)}
                  className="createappointment_input"
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div className="create_appointment_right_box">
              <div className="">
                <label htmlFor="cars">Select Clinic:</label>
                <select
                  className="custom_select"
                  onClick={onClickClinic}
                  onChange={(e) => onChangeInput("clinicId", e.target.value)}
                  required
                >
                  <option value="No Clinic">Select Clinic</option>
                  {clinics.map((clinic, i) => (
                    <option
                      key={clinic?._id}
                      className="select-items"
                      value={clinic?._id}
                    >
                      {clinic?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input_icons">
                <label htmlFor="age">Date of Birth</label>
                <div className="input_icons material_input">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={formData.dateOfBirth}
                      onChange={(date) => onChangeInput("dateOfBirth", date)}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          className="text_field_material"
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "Select Date",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className=" phone_input_box">
                <label htmlFor="number">Phone Number*</label>
                <input
                  name="phone"
                  type="number"
                  onChange={(e) => onChangeInput("phone", e.target.value)}
                  className="createappointment_input_phone"
                  placeholder="Enter phone number"
                  required
                />
                <span className="country_code">+91</span>
              </div>

              <div className="">
                <label htmlFor="fees">Consulation Fees*</label>
                <input
                  type="number"
                  name="fees"
                  onChange={(e) => onChangeInput("fees", e.target.value)}
                  className="createappointment_input"
                  placeholder="Consulation Fees"
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="stepper_btn" onClick={onSubmitForm}>
              {loading ? <Spinner /> : "Create Appointment"}
            </button>
            <CreatedModal modalIsOpen={modalIsOpen} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAppointment;
