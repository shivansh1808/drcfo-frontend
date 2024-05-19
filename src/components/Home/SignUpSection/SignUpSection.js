import React, { useState } from "react";
import "./SignUpSection.css";
import doc from "../../../assets/images/home/ss_doc.png";
import bg1 from "../../../assets/images/home/ss_bg_1.png";
import bg2 from "../../../assets/images/home/ss_bg_2.png";
import { useNavigate } from "react-router-dom";
import QueryForm from "../Header/QueryForm";
// import doc from '../../../assets/images/home/ss_doc.png'
const SignUpSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="SignUpSection">
      <img src={bg1} alt="" className="SignUpSection_bg1" />
      <img src={bg2} alt="" className="SignUpSection_bg2" />
      <div className="signUp_image_container">
        <div className="sign_up_left">
          <img src={doc} alt="" className="sign_up_left_image" />
        </div>
      </div>
      <div className="signup_right">
        <div className="signup_right_wrapper">
          <h1>Focus on Your Patients. Let DRCFO Do the Rest</h1>
          <p>Sign up now and get FREE access to dedicated doctors’ community</p>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
