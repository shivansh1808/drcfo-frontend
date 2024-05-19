import React from "react";
import image1 from "../../../assets/images/home/p1.png";
import image2 from "../../../assets/images/home/p2.png";
import image3 from "../../../assets/images/home/p3.png";
import bg3 from "../../../assets/images/home/pbg3.png";
import picon1 from "../../../assets/images/home/picon1.png";
import picon2 from "../../../assets/images/home/picons2.png";
import picon3 from "../../../assets/images/home/picon3.png";
import pillus1 from "../../../assets/images/home/p_illus1.png";
import pillus2 from "../../../assets/images/home/p_illus2.png";
import pillus3 from "../../../assets/images/home/p_illus3.png";
import pillus4 from "../../../assets/images/home/p_illus4.png";
import pillus5 from "../../../assets/images/home/p_illus5.png";
import "./DoctorParadigm.css";
const DoctorParadigm = () => {
  return (
    <div className="paradigm_container">
      <img src={bg3} alt="" className="paradigm_container_bg3" />
      <div className="paradigm_header">
        <h1>Shifting The Paradigm for Doctors</h1>
      </div>
      <div className="paradigm_box d-flex justify-content-center align-items-center flex-column">
        <div className="paradigm_card card1">
          <div className="">
            <img src={image1} alt="" className="paradigm_image1" />
          </div>
          <div className="paradigm_card_content content_1">
            <h6>
              <img src={picon1} alt="" className="paradigm_icons" /> Video
              Consultation
            </h6>
            <p>
              Provide secure video consultation to your patients from the
              comfort of your home
            </p>
          </div>
        </div>
        <div className="paradigm_card">
          <div className="paradigm_card_content">
            <h6>
              {" "}
              <img src={picon2} alt="" className="paradigm_icons" />{" "}
              Prescription on the Go
            </h6>
            <p>
              No longer spending time on writing the repeat diagnosis &
              prescriptions. Make a single prescription and save it as a
              template. Or choose from multiple preexisting medical templates
              available
            </p>
          </div>
          <div className=" ms-5">
            <img src={image2} alt="" className="paradigm_image2" />
          </div>
        </div>
        <div className="paradigm_card">
          <div className="">
            <img src={image3} alt="" className="paradigm_image3" />
          </div>
          <div className="paradigm_card_content">
            <h6>
              <img src={picon3} alt="" className="paradigm_icons" /> Patient
              Management
            </h6>
            <p>
              Manage appointment, prescriptions, diagnosis of all your patients
              from a single platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorParadigm;
