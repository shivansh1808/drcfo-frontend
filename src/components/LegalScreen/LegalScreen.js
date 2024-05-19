import React, { useEffect, useState } from "react";
import "./LegalScreen.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import { useOutletContext } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import PatientDetailsExpanded from "./PatientDetailsExpanded";
import MedicalRecordExpanded from "./MedicalRecordExpanded";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../axios";
import PatientsTableSkeleton from "./PatientsTableSkeleton";
import PatientTable from "./PatientTable";
import MedicalRecordTable from "./MedicalRecordTable";
const ClickOutHandler = require("react-onclickout");

const LegalScreen = () => {
  // console.log("LegalScreen");

  return (
    <>
      <PatientTable />
      <MedicalRecordTable />
    </>
  );
};

export default LegalScreen;
