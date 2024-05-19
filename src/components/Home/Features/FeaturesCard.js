import "./FeaturesCard.css";
import React from "react";

const FeaturesCard = ({ item }) => {
  return (
    <div
      className={item.className === "bg" ? "features_card bg" : "features_card"}
    >
      <div className="d-flex justify-content-start align-items-center">
        <img src={item.icon} alt="" />
        <h1>{item.title}</h1>
      </div>
      <p>{item.description}</p>
    </div>
  );
};

export default FeaturesCard;
