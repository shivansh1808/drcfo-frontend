import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClinicCard from "./ClinicCard";
import { useOutletContext } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "../../axios";
import { getClinics } from "../../api/clinic";
import useAppContext from "../context/AppContext";

const Clinicscreen = () => {
  const navigate = useNavigate();
  const [searchText] = useOutletContext();
  const { setSnackbar } = useAppContext();

  const [clinics, setClinics] = useState([]);
  const [filterClinics, setFilterClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedClinicId, setDeletedClinicId] = useState("");

  async function onComponentLoad() {
    setLoading(true);
    const response = await getClinics();
    if (response?.status === 200) {
      setClinics(response?.data?.data);
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Error fetching clinics",
      });
    }
    setLoading(false);
  }

  function handleDeletedClinicId() {
    if (deletedClinicId?.length && clinics?.length) {
      const foundIndex = clinics.findIndex(
        (clinic) => clinic?._id === deletedClinicId
      );
      console.log("handleDeletedClinicId", deletedClinicId, foundIndex);
      if (foundIndex > -1) {
        setClinics((prev) => {
          const newState = [...prev];
          newState.splice(foundIndex, 1);
          return newState;
        });
      }
      setDeletedClinicId("");
    }
  }

  function onClickAddNewClinic() {
    navigate("/addnewclinic", { state: { step: 1 } });
  }

  useEffect(() => {
    onComponentLoad();
  }, []);

  useEffect(() => {
    handleDeletedClinicId();
  }, [deletedClinicId]);

  const clinicFilter = () => {
    const filteredData = filterClinics.filter((val) => {
      // console.log(val.name, searchText);
      if (
        val.name
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        val.area
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        val.city
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        val.state
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        val.street
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        val.pincode
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      ) {
        return val;
      }
    });
    setClinics(filteredData);
  };

  useEffect(() => {
    onComponentLoad();
  }, []);

  useEffect(() => {
    clinicFilter();
  }, [searchText]);

  return (
    <div className="">
      {loading ? (
        <div className="clinic_box_demo">
          <Skeleton animation="wave" width="50%" />
          <Skeleton animation="wave" width="40%" />
          <Skeleton animation="wave" width="80%" />

          <div className="d-flex justify-content-start">
            <Skeleton animation="wave" width="30%" className="me-5" />
            <Skeleton animation="wave" width="30%" />
          </div>
          <div className="mt-5 pt-5">
            <Skeleton animation="wave" width="30%" />
            <Skeleton animation="wave" width="30%" />
          </div>
        </div>
      ) : (
        clinics?.map((clinic) => (
          <ClinicCard
            key={clinic._id}
            clinic={clinic}
            setDeletedClinicId={setDeletedClinicId}
          />
        ))
      )}

      <div className="clinic_list_wrapper_btn">
        <button onClick={onClickAddNewClinic}>Add New Clinic</button>
      </div>
    </div>
  );
};

export default Clinicscreen;
