import "./Footer.css";
import li from "../../../assets/images/home/ig.png";
import ig from "../../../assets/images/home/in.png";

import logo from "../../../assets/images/home/HOME_LOGO.png";
import f1 from "../../../assets/images/home/footer_bottom.png";
import f2 from "../../../assets/images/home/footer_top.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QueryForm from "../Header/QueryForm";
const Footer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <footer className="footer_wrapper">
      <img src={f2} alt="" className="footer_top" />
      <img src={f1} alt="" className="footer_bottom" />
      <div className="footer_col_1">
        <h6 className="footer_head">
          Launching on 1st March, Join us now to get <span>free</span> one year
          subscription.
        </h6>
        <button onClick={() => setOpen(true)}>Join Now</button>
        <QueryForm open={open} setOpen={setOpen} />

        <div className="footer_contact d-flex justify-content-between mt-4">
          <div>
            <h5>Call us at</h5>
            <p>+91 94150 20199</p>
          </div>
          <div className="ms-2">
            <h5>Mail us at</h5>
            <p>support@drcfo.in</p>
          </div>
        </div>
        <div className="mt-3">
          <h5>Address</h5>
          <p className="w-75">
            C 5, 2nd Floor K K Apartment <br /> Opposite Narmada Bhawan (Near
            Ganna Sansthan) Dali Bagh, Lucknow-226001
          </p>
        </div>
      </div>
      <div className="footer_col_2">
        <p onClick={() => navigate("/tandc")}>Terms and Conditions</p>
        <p onClick={() => navigate("/privacy")}>Privacy Policy</p>{" "}
        <div className="social_buttons">
          <div>
            <a
              href="https://www.linkedin.com/company/doctorcfo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ig} alt="" />
            </a>
          </div>
          <div>
            <a
              href="https://instagram.com/doctor_cfo?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={li} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer_col_3" onClick={() => navigate("/")}>
        <img src={logo} alt="" />
        <h5>DRCFO</h5>
      </div>
    </footer>
  );
};

export default Footer;
