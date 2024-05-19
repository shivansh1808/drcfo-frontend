import React, { useEffect, useState } from "react";
import "./PersonalDetail.css";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import CreatableSelect from "react-select/creatable";
import { updateDoctor } from "../../api/doctor";
import { CircularProgress } from "@mui/material";
import { getUniueArray } from "../../util";
import useAppContext from "../context/AppContext";
import specialitiesData from "../../assets/data/specialities.json";

const PersonalDetail = ({ setActiveStep, registrationNumber }) => {
  const { user } = useAuth();
  const { setSnackbar } = useAppContext();

  const [specialities, setSpecialitites] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {
      name: data.name || user?.name,
      totalExperience: data.experience || user?.experience,
      education: data.education || user?.education,
      bio: data.bio || user?.bio,
      specialities: specialities || user?.specialities,
    };

    const responseData = await updateDoctor(formData);
    if (responseData) {
      setActiveStep(1);
    } else {
      setSnackbar({
        open: true,
        message: "Could save personal details",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const { register, handleSubmit } = useForm();

  function onChangeMajorSpeciality(data) {
    // console.log("onChangeMajorSpeciality", data);
    if (data.length) {
      const dataLabels = data?.map((speciality) => speciality.label);
      setSpecialitites((prev) => getUniueArray([...prev, ...dataLabels]));
    }
  }

  function onChangeMinorSpeciality(data) {
    // console.log("onChangeMinorSpeciality", data);
    if (data.length) {
      const dataLabels = data?.map((speciality) => speciality.label);
      setSpecialitites((prev) => getUniueArray([...prev, ...dataLabels]));
    }
  }

  return (
    <div className="personal_detail_form">
      <h1>Personal Details</h1>
      <p>It’s going to take only few minutes</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="personal_detail_box">
          <div className="">
            <div className="input_icons">
              <label htmlFor="name">Full Name*</label>

              <input
                {...register("name")}
                type="text"
                className="stepper_input"
                placeholder="Enter your Full Name"
                defaultValue={user.name || ""}
                required
              />
            </div>
            <div className="input_icons">
              <label htmlFor="education">Education</label>

              <input
                placeholder="Enter your Education deatils"
                {...register("education")}
                type="text"
                name="education"
                className="stepper_input"
                defaultValue={user.education}
                required
              />
            </div>
          </div>
          <div>
            <div className="input_icons">
              <label htmlFor="experience">Total Year of Experiance</label>
              <input
                {...register("experience")}
                type="number"
                name="experience"
                className="stepper_input"
                placeholder="Enter total year of Experiance"
                defaultValue={user.experience}
                required
              />
            </div>
            <div className="d-flex justify-content-between speciality_dropdown_container">
              <div>
                <label htmlFor="">Major Speciality*</label>
                <div className="speciality_dropdown_1">
                  {/*  TODO Speciality */}
                  <CreatableSelect
                    isClearable
                    isMulti
                    options={(specialitiesData || []).map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    onChange={onChangeMajorSpeciality}
                    placeholder="Type to Major Specialities"
                  />
                </div>{" "}
              </div>
              <div>
                <label htmlFor="">Minor Speciality*</label>
                <div className="speciality_dropdown_1">
                  {/*  TODO Speciality */}
                  <CreatableSelect
                    isClearable
                    isMulti
                    options={(specialitiesData || []).map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    // onChange={(event) => {
                    // 	console.log(event);
                    // 	setSpecialitites(event.map((item) => item.value));
                    // }}
                    onChange={onChangeMinorSpeciality}
                    placeholder="Type to Minor Specialities"
                  />
                  {/* <Select
										isMulti
										unstyled
										placeholder={
											<div className="speciality_placeholder">
												Type to Minor Specialities
											</div>
										}
										name="colors"
										options={colourOptions}
										onChange={onChangeMinorSpeciality}
										// className="basic-multi-select"
										// classNamePrefix="select"
									/> */}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="stepper_text_area">
          <label htmlFor="bio">Add Bio*</label>
          <textarea
            {...register("bio", { required: true })}
            name="bio"
            // cols="100"
            // rows="5"
            className="stepper_input5"
            defaultValue={user.bio}
          ></textarea>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <button className="stepper_btn" type="submit">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress sx={{ color: "white" }} size="1.25rem" />
              </div>
            ) : (
              "Save & Next"
            )}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default PersonalDetail;
