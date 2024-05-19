import React from "react";
import "./HIPAACard.css";
import hippaimage from "../../../assets/images/home/hippa.png";
const HIPAACard = () => {
  return (
    <div className="HIPAACard">
      <div className="HIPAACard_content">
        <h1>HIPAA Compliance Savvy</h1>
        <p>
          DRCFO helps you regulate in accordance with HIPAA and other legal
          Compliance in India.
        </p>
      </div>
      <img src={hippaimage} alt="" className="hippa_image" />
    </div>
  );
};

export default HIPAACard;
