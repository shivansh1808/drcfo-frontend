import React, { useEffect, useState } from "react";
import "../ClinicStepper/PersonalDetail.css";
import axios from '../../axios'
import Box from "@mui/material/Box";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/AuthContext";
// Assest Imports
import userLogo from "../../assets/images/login_user.png";
import phoneLogo from "../../assets/images/phone.png";
import mailLogo from "../../assets/images/mail.png";
import specialLogo from "../../assets/images/speciality.png";
import eduLogo from "../../assets/images/edu.png";
import expLogo from "../../assets/images/exp.png";
import { useParams, useNavigate } from "react-router-dom";
const EditPatient = () => {
  const { id } = useParams();
  const [specialities, setSpecialitites] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  console.log(specialities);
  useEffect(() => {
    // fetch(`https://drco-all-backend-617u.onrender.com/get/docter?id=${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setName(data.name);
    //     setEducation(data.education);
    //     setEmail(data.email);
    //     setBio(data.bio);
    //     setPhone(data.phone);
    //     console.log(data.phone);
    //     setExperience(data.experience);
    //     setSpecialitites(data.specialities);
    //   });
      axios.get(`/get/docter?id=${id}`).then((res)=>{
        setName(res.data.name);
        setEducation(res.data.education);
        setEmail(res.data.email);
        setBio(res.data.bio);
        setPhone(res.data.phone);
        console.log(res.data.phone);
        setExperience(res.data.experience);
        setSpecialitites(res.data.specialities);
      })
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: id,
      name,
      education,
      email,
      bio,
      phone,
      experience,
      specialities,
    };
    console.log(data);
    // fetch("https://drco-all-backend-617u.onrender.com/edit/docter", {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => navigate(-1));
      axios.put(`/edit/docter`,data).then((res)=>{
        navigate(-1)
      })
  };
  const topSpecialities = [
    "Anaesthesiologists",
    "Allergists/Immunologists",
    "Cardiologists",
    "Colon and Rectal Surgeons",
    "Critical Care Medicine Specialists",
    "Dermatologists",
    "Endocrinologists",
    "Emergency Medicine Specialists",
    "General Physicians",
    "Gastroenterologists",
    "Geriatric Medicine Specialists",
    "Haematologists",
    "Hospice and Palliative Medicine Specialists",
    "Infectious Disease Specialists",
    "Internists",
    "Medical Geneticists",
    "Nephrologists",
    "Neurologists",
    "Obstetricians and Gynecologists",
    "Oncologists",
    "Ophthalmologists",
    "Osteopaths",
    "Otolaryngologists",
    "Pathologists",
    "Paediatricians",
    "Physiatrists",
    "Plastic Surgeons",
    "Podiatrists",
    "Preventive Medicine Specialists",
    "Psychiatrists",
    "Pulmonologists",
    "Radiologists",
    "Rheumatologists",
    "General Surgeons",
    "Urologists",
    "Homeopathy",
    "Ayurveda",
    "Unani",
    "Others (Please Specify)  ",
  ];

  return (
    <div className="personal_detail_form d-flex justify-content-center align-items-center flex-column">
      <h1>Edit Personal Details</h1>
      <p>It’s going to take only few minutes</p>{" "}
      <form onSubmit={handleSubmit}>
        <div className="personal_detail_box">
          <div className="input_icons">
            <label htmlFor="name">Full Name*</label>
            <img src={userLogo} alt="" className="input_icon_clinic" />
            <input
              type="text"
              className="stepper_input"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input_icons">
            <label htmlFor="number">Phone Number*</label>
            <img src={phoneLogo} alt="" className="input_icon_clinic" />
            <input
              type="tel"
              className="stepper_input "
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input_icons">
            <label htmlFor="email">Email ID</label>
            <img src={mailLogo} alt="" className="input_icon_clinic" />
            <input
              type="email"
              name="email"
              className="stepper_input"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input_icons">
            <label htmlFor="education">Education</label>
            <img src={eduLogo} alt="" className="input_icon_clinic" />
            <input
              type="text"
              name="education"
              className="stepper_input"
              defaultValue={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>
          <div className="input_icons">
            <label htmlFor="specialities">Add Specialities*</label>
            <img src={specialLogo} alt="" className="input_icon_clinic_auto" />
            <Autocomplete
              onChange={(e, value) => setSpecialitites(value)}
              multiple
              id="tags-standard"
              options={topSpecialities}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  className="speciality_input"
                />
              )}
            />
          </div>
          <div className="input_icons">
            <label htmlFor="experience">Total Year of Experiance </label>
            <img src={expLogo} alt="" className="input_icon_clinic" />
            <input
              type="number"
              name="experience"
              className="stepper_input"
              placeholder="Enter total year of Experiance"
              defaultValue={experience}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="bio">Add Bio*</label>
            <textarea
              name="bio"
              cols="40"
              rows="5"
              className="stepper_input5"
              defaultValue={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            ></textarea>
          </div>
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
            Save & Next
          </button>
        </Box>
      </form>
    </div>
  );
};

export default EditPatient;
