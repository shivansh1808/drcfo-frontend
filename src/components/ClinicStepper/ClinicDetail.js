import React, { useEffect, useMemo, useState } from "react";
import "./ClinicDetail.css";
import locationicon from "../../assets/images/locationicon.png";
import Box from "@mui/material/Box";
import { createClinic, updateClinic } from "../../api/clinic";
import { CircularProgress } from "@mui/material";
import { getAddressByLocation, getCurrentLocation } from "../../util/location";
import useAppContext from "../context/AppContext";

const initialState = {
  formData: {},
};

const ClinicDetail = ({ setActiveStep, clinic, setClinic, isUpdateClinic }) => {
  if (isUpdateClinic)
    initialState.formData = {
      name: clinic?.name,
      fees: clinic?.fees,
      pincode: clinic?.address?.pincode,
      street: clinic?.address?.street,
      area: clinic?.address?.area,
      city: clinic?.address?.city,
      state: clinic?.address?.state,
    };
  // console.log("ClinicDetail", isUpdateClinic, clinic);

  const { setSnackbar } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [loadinLocation, setLoadingLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({});
  const [formData, setFormData] = useState(initialState.formData);

  async function onComponentLoad() {
    window.scroll(0, 0);
    setCurrentLocation(await getCurrentLocation());
  }

  function onChangeFormData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleFormData() {
    if (formData.pincode?.length == 6) {
      // const responseData = await getAddressByPincode(formData.pincode);
      // console.log("handleFormData", responseData);
      // PENDING
    }
  }

  async function onClickAddCurrentLocation(e) {
    // console.log("onClickAddCurrentLocation");
    e.preventDefault();
    setLoadingLocation(true);
    if (!currentLocation?.lat || !currentLocation?.lng) {
      return;
    }
    const address = await getAddressByLocation(currentLocation);
    // PENDING
    setLoadingLocation(false);
  }

  async function onClickSave(e) {
    e.preventDefault();
    setLoading(true);
    // console.log("onSubmit", formData, currentLocation);
    const clinicData = {
      name: formData.name,
      fees: formData.fees,
      address: {
        pincode: formData.pincode,
        street: formData.street,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        location: currentLocation,
      },
    };
    console.log("clinicData", clinicData);
    const response = await (isUpdateClinic
      ? updateClinic(clinic?._id, clinicData)
      : createClinic(clinicData));
    // console.log("onClickSave", response);
    if (response?.status === 200) {
      setClinic(response.data.data);
      setSnackbar({
        open: true,
        severity: "success",
        message: `Clinic ${
          isUpdateClinic ? "updated" : "created"
        } successfully`,
      });
      setActiveStep(2);
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          response?.data?.message ||
          `Could not ${isUpdateClinic ? "update" : "create"} clinic`,
      });
    }
    setLoading(false);
  }

  useEffect(
    () => {
      // console.log("ClinicDetails currentLocation", currentLocation);
      // console.log('ClinicDetails formData', formData)
    },
    [
      // currentLocation,
      // formData,
    ]
  );

  useEffect(() => {
    onComponentLoad();
  }, []);

  useMemo(() => {
    handleFormData();
  }, [formData]);

  return (
    <div className="clinic_detail_form">
      <h1>Clinic Details/Location</h1>
      <p>It’s going to take only few minutes</p>

      <form>
        <div className="clinic_detail_box">
          <div className="px-5">
            {" "}
            <div>
              <label htmlFor="clinicName">Clinic Name*</label>
              <input
                type="text"
                className="clinic_input"
                placeholder="Enter Clinic Name"
                name="name"
                value={formData.name}
                onChange={onChangeFormData}
              />
            </div>
            <div>
              <label htmlFor="fees">Consultation fee*</label>
              <input
                type="number"
                className="clinic_input"
                placeholder="Enter consultation fee"
                name="fees"
                value={formData.fees}
                onChange={onChangeFormData}
              />
            </div>{" "}
            <div>
              <label htmlFor="pincode">Pincode*</label>
              <input
                type="number"
                className="pincode_input"
                placeholder="Enter your Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeFormData}
              />
            </div>
            <div>
              <label htmlFor="houseNum">House/Street/Gali Number*</label>
              <input
                type="text"
                className="clinic_input"
                placeholder="Enter your House/Street/Gali Number"
                name="street"
                value={formData.street}
                onChange={onChangeFormData}
              />
            </div>
          </div>
          <div className="px-5">
            {" "}
            <div>
              <label htmlFor="area">Sec/Area/Locality</label>
              <input
                type="text"
                name="area"
                className="clinic_input"
                placeholder="Enter your Sec/Area/Locality"
                value={formData.area}
                onChange={onChangeFormData}
              />
            </div>
            <div>
              <label htmlFor="city">City*</label>
              <input
                type="text"
                name="city"
                id="city"
                className="clinic_input"
                placeholder="Enter your City"
                value={formData.city}
                onChange={onChangeFormData}
              />
            </div>
            <div>
              <label htmlFor="state">State*</label>
              <input
                type="text"
                id="state"
                className="clinic_input"
                placeholder="Enter your State"
                name="state"
                value={formData.state}
                onChange={onChangeFormData}
              />
            </div>{" "}
            <div>
              <label htmlFor="clinicLocation">
                Add current location to get better result
              </label>
              <button
                className="location_button"
                onClick={onClickAddCurrentLocation}
              >
                <img src={locationicon} alt="locationicon"></img> Add Current
                Location
              </button>
            </div>
          </div>
        </div>{" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <button className="stepper_btn" onClick={onClickSave}>
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

export default ClinicDetail;
