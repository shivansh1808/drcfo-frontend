import React, { forwardRef } from "react";
import "./FilterModal.css";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
  },
};

const CompletedFilters = ({
  isOpen,
  setIsOpen,
  setSortValue,
  setClinicName,
  clinicName,
  setPatientType,
  clinicsList,
  setbookingsDate,
  bookingDate2,
}) => {
  const closeModal = (value) => {
    if (value == "reset") {
      // appointmentreset();
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const getclinicName = (e) => {
    var updatedList = [...clinicName];
    if (e.target.checked) {
      updatedList = [...clinicName, e.target.value];
    } else {
      updatedList.splice(clinicName.indexOf(e.target.value), 1);
    }
    setClinicName(updatedList);
  };
  const onChange = (date) => {
    // const [start, end] = dates;
    setbookingsDate(date);
  };

  const getSortValue = (e) => {
    setSortValue(e.target.value);
  };
  const getPatientTypeValue = (e) => {
    setPatientType(e.target.value);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="select_date_filter_button" onClick={onClick} ref={ref}>
      {value.length ? (
        value
      ) : (
        <>
          <span>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <rect width="17" height="17" fill="url(#pattern1)" />
              <defs>
                <pattern
                  id="pattern1"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_4565_734"
                    transform="scale(0.0111111)"
                  />
                </pattern>
                <image
                  id="image0_4565_734"
                  width="90"
                  height="90"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAA2BJREFUeF7t3MFqFEEQBuDq3qCCypKbGN9A0ZvBd8gTCF71tPFoIJmhaXZXvSnrRa9KnkDfQW8GfYSoxwSNB5fZVgayEGHFVLFd3T35czR/T3V/XSRroWMIXyoCRqUKihCglZoA0IBWElAqg44GtJKAUhl0NKCVBJTKoKMBrSSgVAYdnTu0c+5CCOEBEd0loutEdFFpz9plflprP89ms93Dw8OXk8nkl2QDoo52zl0LIbwjopuSogWv2bPWbjjn9rlnYEMfd/KHM4g8t907ODhY53Y2G7qu64dE9Ix7o13KhxA2h8PhhHMmCXTbzbc5RTqYfe+9v8M5lwT6BxFd4hTpYPbIe3+Zcy4J9O9FBbz37GdxNpoqW9f1Us7LxllW4VRw3LrLOi+g/yMPaG5rCvOAFsJxlwGaKybMA1oIx10GaK6YMA9oIRx3GaC5YsI8oIVw3GWA5ooJ89lBC89R7DLubGdpfwUvVky4cUAL4bjLAM0VE+YBLYTjLgM0V0yYB7QQjrsM0FwxYR7QQjjuspKgp8aYyhjzpj1k0zT3rLWeiM7949BZ5YuBDiFsDYfDpydRd3Z2HllrnyyCzi1fDHTTNFfH4/G3k6jOuSshhL/+bP793PLFQFtr15xzX09Cb29vr/V6vYX/gDC3fDHQi34UVFW1ZYx5fNofHSnzxUAT0TSEUK+srLw+7S/DnPIlQXM/UWWVB7TSdQAa0EoCSmXQ0YBWElAqk7Kjs5pFtB8fY85SkkHnNouIvZ9k0LnNImLvJxl0brOI2PtJBl367IK7/2TQpc8uuPtPCa30wSqPMoBWugdAA1pJQKkMOhrQSgJKZVJ2dNTZQuzZBfd+kkHHni3Efn4x0LFnC7GfXwx07NlC7OcXA82dFeSWLwaaOyvIMM+yTvbLkLXLDoQBrXSJgO4QNF7HRvTde9/n3Knkf87iBYNE8V8wWFXVpjHmOec2u5a11g6ccy8452J39GAwOL+6utp29S1Ooa5kjTEfjTHrzrkp50xs6Pbhx681fnvWsFvkpmk2RqPRFw5ymxVBtwvbzu73+/ette2Lum90+H2lR0T0yVq7S0SvuJ08vxAxNPdGz3oe0EodAGhAKwkolUFHA1pJQKkMOhrQSgJKZdDRgFYSUCqDjga0koBSmT+Kz8yILLzmpwAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </span>
          Choose Date
        </>
      )}
    </button>
  ));

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="filter_modal">
        <div className="filter_header">
          <p onClick={closeModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 5L4 12L11 19M4 12H20"
                stroke="#100DB1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filter(C)
          </p>
          <span
            onClick={() => closeModal("reset")}
            className="patient_tab_filter_reset_cta"
          >
            Reset
          </span>
        </div>
        <div className="sort_filter">
          <h2>Sort By</h2>
          <section className="light">
            <div>
              <label>
                <input
                  type="radio"
                  name="light"
                  value="a-z"
                  onChange={getSortValue}
                />
                <span className="design"></span>
                <span className="text">Name (A-Z)</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="light"
                  value="z-a"
                  onChange={getSortValue}
                />
                <span className="design"></span>
                <span className="text">Name (Z-A)</span>
              </label>
            </div>
            <div>
              {" "}
              <label>
                <input
                  type="radio"
                  name="light"
                  onChange={getSortValue}
                  value="New-Old"
                />
                <span className="design"></span>
                <span className="text">Date (New-Old)</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="light"
                  value="Old-New"
                  onChange={getSortValue}
                />
                <span className="design"></span>
                <span className="text">Date (Old-New) </span>
              </label>
            </div>
          </section>
        </div>
        <h2 className="Clinic_filter_header_label">Clinic</h2>
        <div className="category_filter">
          {clinicsList.map((item, i) => (
            <label key={i} className="category_container">
              {item.name}
              <input
                type="checkbox"
                value={item._id}
                onChange={getclinicName}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
        <div className="patient_type_filter">
          <h2>Patient Type</h2>
          <section className="light">
            <label>
              <input type="radio" name="light" value="followup" />
              <span className="design"></span>
              <span className="text">Follow Up</span>
            </label>
            <label>
              <input type="radio" name="light" value="new" />
              <span className="design"></span>
              <span className="text">New</span>
            </label>
          </section>
        </div>
        <div className="patient_type_filter">
          <h2>Booking Type</h2>
          <section className="light">
            <label>
              <input
                type="radio"
                name="light"
                value="online"
                onChange={getPatientTypeValue}
              />
              <span className="design"></span>
              <span className="text">Online</span>
            </label>
            <label>
              <input
                type="radio"
                name="light"
                value="walk-in"
                onChange={getPatientTypeValue}
              />
              <span className="design"></span>
              <span className="text">Walk In</span>
            </label>
          </section>
        </div>
        <div className="select_date_filter">
          <h2>Select Date</h2>
          <DatePicker
            customInput={<ExampleCustomInput />}
            selected={bookingDate2}
            onChange={onChange}
          />
        </div>
        {/* <div className="filter_apply_btn">
          <button>Apply</button>
        </div> */}
      </div>
    </Modal>
  );
};

export default CompletedFilters;
