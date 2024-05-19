import React from "react";
import moduleimage from "../../../assets/images/home/Dashboard 2.png";
import "./Modules.css";
import bg from "../../../assets/images/home/module_bg.png";

const Modules = () => {
  return (
    <div className="module_container">
      <img src={bg} alt="" className="module_bg" />
      <div className="module_header">
        <h1>
          Modules That Take Full Control
          <br />
          Of Your Practice
        </h1>
      </div>

      <div className="module_box">
        <div className="module_image">
          <img src={moduleimage} alt="" />
          <div className="module module_1">
            <h3>Doctor’s Module</h3>
            <p>
              Manage your practice, customize prescriptions, get invaluable
              insights into your practice and much more!
            </p>
          </div>
          <div className="module module_2">
            <h3>
              Receptionist <br /> Module
            </h3>
            <p>
              A console for your receptionist where all your in person/ video
              appointments can be scheduled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
