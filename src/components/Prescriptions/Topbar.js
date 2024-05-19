import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import searchicon from "../../assets/images/template.png";
import "./Topbar.css";
import leftarrow from "../../assets/images/leftarrow.png";
import AddVitals from "./AddVitals";
import moment from "moment";

const Topbar = ({
  appointmentId,
  templates,
  modalIsOpen,
  setIsOpen,
  setVitalsData,
  vitalsData,
  patient,
  setActiveTemplate,
}) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(true);

  const openPrescription = (id) => {
    console.log("id", id);
    setActiveTemplate(id);
  };

  return (
    <nav className="NavbarItems">
      <div className="logo">
        <NavLink to="/dashboard" className="route_link">
          <span className="topbar_header">
            <img src={leftarrow} alt="leftarrow" />
            {!brand ? "Template Editor" : "Prescription Generator"}
          </span>
        </NavLink>
      </div>
      {!brand ? null : (
        <div className="d-flex">
          <button className="add_vitals_cta" onClick={() => setIsOpen(true)}>
            Add Vitals
          </button>
          <AddVitals
            appointmentId={appointmentId}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            setVitalsData={setVitalsData}
            vitalsData={vitalsData}
            patient={patient}
          />
          <div className="template_container template_dropdown_container">
            <h1>Select Template</h1>
            <div className="template_dropdown">
              <div className="templet_drop_header">
                <h2>Select Template </h2>
                <p className="">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.47325e-05 11.9887C0.0198571 5.35192 5.41635 -0.0224592 12.0365 7.05769e-05C18.6307 0.0226004 24.0306 5.44545 23.9999 12.0153C23.9691 18.7059 18.5645 24.0407 11.8583 23.9998C5.33646 23.9602 -0.0197477 18.5346 5.47325e-05 11.9873V11.9887ZM10.4994 12.0378C10.3922 12.1129 10.3055 12.1566 10.2406 12.2215C9.30513 13.1527 8.371 14.086 7.43961 15.0213C7.06268 15.4002 6.96845 15.8692 7.17193 16.3048C7.50038 17.0073 8.3908 17.1466 8.96781 16.5752C9.91217 15.6405 10.8477 14.697 11.7879 13.7576C11.8528 13.6927 11.9211 13.6313 11.9989 13.5575C12.0706 13.6238 12.1341 13.6777 12.1929 13.7364C12.7651 14.3085 13.3373 14.8807 13.9088 15.4528C14.3063 15.8501 14.6989 16.2529 15.1038 16.6428C15.409 16.937 15.7764 17.036 16.1875 16.909C16.5972 16.782 16.8492 16.4973 16.9366 16.0816C17.0246 15.6603 16.8649 15.3183 16.5678 15.0227C15.6262 14.0853 14.688 13.1445 13.7484 12.2044C13.6842 12.1402 13.6227 12.0733 13.5142 11.9593C13.6111 11.8897 13.6972 11.8446 13.7627 11.7791C14.6982 10.8471 15.6289 9.91113 16.5651 8.98058C16.8621 8.68497 17.0233 8.34361 16.9372 7.92237C16.8519 7.50591 16.5999 7.21985 16.1902 7.09286C15.7587 6.95905 15.3831 7.07579 15.0683 7.38984C14.1157 8.34019 13.1652 9.29327 12.2133 10.2443C12.1485 10.3092 12.0802 10.3706 12.0017 10.4443C11.9238 10.3713 11.8549 10.3098 11.79 10.2457C10.8443 9.30078 9.90057 8.35248 8.9521 7.40964C8.4707 6.93106 7.80083 6.91604 7.35767 7.36253C6.9145 7.80972 6.93635 8.47196 7.41639 8.95669C7.92579 9.47146 8.43929 9.98145 8.95142 10.4935C9.44511 10.9864 9.93949 11.4787 10.4987 12.0358L10.4994 12.0378Z"
                      fill="black"
                    />
                  </svg>
                </p>
              </div>
              <div className="">
                <img src={searchicon} alt="" className="template_icon_clinic" />
                <input
                  type="text"
                  className="template_search"
                  placeholder="Search Template"
                />
              </div>
              <h6>My Template</h6>
              <p>Use the template to prefill the fields</p>
              <div className="template_list">
                {templates.length > 0 ? (
                  templates.map((item, index) => (
                    <div className="template_item" key={index}>
                      <h5>
                        {item.createdAt != null
                          ? moment(item.createdAt).format("DD/MM/YY") +
                            " - " +
                            item.complain.join(", ").substring(0, 10)
                          : item.complain.join(", ").substring(0, 20)}
                      </h5>
                      <div>
                        <button
                          className="template_use_btn"
                          onClick={() => openPrescription(item._id)}
                        >
                          Use
                        </button>
                        <button
                          className="template_edit_btn"
                          onClick={() => navigate(`/edittemplate/${item._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="template_item">
                    <h5>No Template Found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
