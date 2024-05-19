import React from "react";
import "./Header.css";
import doc from "../../../assets/images/home/home_dov.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QueryForm from "./QueryForm";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="header_screen container">
      <div className="row">
        <div className="header_left col-md-6">
          <div className="">
            <h1>Revolutionizing the Way Your Medical Practice Operates</h1>
            <p>
              Enabling doctors to streamline their practice by providing
              scheduling, customizable prescriptions, patient management, growth
              analytics and a lot more!
            </p>
            {/* <button onClick={() => setOpen(true)}>Join Now</button>
            <QueryForm open={open} setOpen={setOpen} /> */}
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <h6>
              Join our <span>User Testing Program</span> to get free one year
              subscription
            </h6>
          </div>
        </div>
        <div className="header_right col-md-6">
          <div className="doctor_background">
            <img src={doc} alt="" className="header_doctor_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
