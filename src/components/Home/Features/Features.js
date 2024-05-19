import React from "react";
import "./Features.css";
import bg1 from "../../../assets/images/home/fbg1.png";
import bg2 from "../../../assets/images/home/fbg2.png";
import FeaturesCard from "./FeaturesCard";
import icon1 from "../../../assets/images/home/ficon1.png";
import icon2 from "../../../assets/images/home/ficon2.png";
import icon3 from "../../../assets/images/home/ficon3.png";
import icon4 from "../../../assets/images/home/ficon4.png";
import quote_bottom from "../../../assets/images/home/quote_bottom.png";
const featuresData = [
  {
    id: 1,
    icon: icon1,
    title: "Real Time Patient Notifications",
    description:
      "Make Your patients’ lives easier as the platform sends notifications to patients for upcoming appointments, tests and medicine consumption.",
    className: "nobg",
  },

  {
    id: 2,
    icon: icon2,
    title: "Your Accounting and Legal Pro",
    description:
      "Records related to financial transactions, and records related to various legal compliances in real-time",
    className: "bg",
  },
  {
    id: 3,
    icon: icon3,
    title: "Dive  Into Insights",
    description:
      "Get crunchable insights into your practice and plan your expansion strategy.",
    className: "bg",
  },

  {
    id: 4,
    icon: icon4,
    title: "Manage Multiple Clinics",
    description:
      "No more badgering about maintaining patient records at multiple clinics. Go digital with DRCFO",
    className: "nobg",
  },
];
const Features = () => {
  return (
    <div className="features_container">
      <img src={bg1} alt="" className="features_container_bg1" />
      <img src={bg2} alt="" className="features_container_bg2" />
      <div className="features_header">
        <h1>Features So Many, You Don’t Want to Miss Out!</h1>
      </div>
      <div className="features_wrapper">
        <div className="features_left">
          <div className="feature_box">
            {featuresData.map((item) => (
              <FeaturesCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="features_right">
          <img src={quote_bottom} alt="quote_bottom" className="quote_bottom" />
          <img src={quote_bottom} alt="quote_top" className="quote_top" />
          <h2>
            Keep Calm,
            <br />
            You're a Doctor
          </h2>
          <p>And Let DRCFO Take Care Of Your Admin Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
