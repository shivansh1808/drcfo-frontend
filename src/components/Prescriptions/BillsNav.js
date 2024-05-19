import React from "react";
import { useNavigate } from "react-router-dom";
import leftarrow from "../../assets/images/leftarrow.png";
const BillsNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="NavbarItems">
      <div className="logo">
        <span className="topbar_header" onClick={() => navigate(-1)}>
          <img src={leftarrow} alt="leftarrow" /> Prescription Generator
        </span>
      </div>
    </nav>
  );
};

export default BillsNav;
