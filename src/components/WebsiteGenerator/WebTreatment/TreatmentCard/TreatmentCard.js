import React from "react";
import "./TreamentCards.css";
const TreatmentCard = ({ data }) => {
  return (
    <div className="treatment_card">
      <div className="treatment_card_img">
        {data?.picture === null ? (
          <div className="treatment_card_no_picture">No Picture Uploaded</div>
        ) : (
          <img src={data.picture} alt="" />
        )}
      </div>
      <div style={{ padding: "0.5vw" }}>
        <div className="treatment_card_title">{data.name}</div>
        <div className="treatment_card_desc">{data.description}</div>
      </div>
      <div className="treatment_card_options">
        <div className="treatment_card_edit_btn">Edit</div>
        <div className="treatment_card_delete_btn">Delete</div>
      </div>
    </div>
  );
};

export default TreatmentCard;
