import React, { useState } from "react";
import logo from "../../../assets/images/brand_logo_svg.svg";
import "./Navbar.css";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import QueryForm from "../Header/QueryForm";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  // const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="home_nav">
      <div className="home_logo">
        <Link className="text-decoration-none" to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="menu_icon" onClick={handleClick}>
        {clicked ? (
          <svg viewBox="0 0 20 20" fill="currentColor" width="30" height="30">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <ul className={clicked ? `nav_menu active` : `nav_menu`}>
        <div className="menu_box">
          <li onClick={() => setClicked(false)}>
            <NavLink
              className={(navLink) =>
                navLink.isActive ? "nav_link nav_link_active" : "nav_link"
              }
              to="/pricing"
            >
              Pricing
            </NavLink>
          </li>
          <li onClick={() => setClicked(false)}>
            <NavLink
              className={(navLink) =>
                navLink.isActive ? "nav_link nav_link_active" : "nav_link"
              }
              to="/about"
            >
              About Us
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              className={(navLink) =>
                navLink.isActive ? "nav_link nav_link_active" : "nav_link"
              }
              to="/contactus"
            >
              Contact Us
            </NavLink>
          </li> */}
          <li onClick={() => setClicked(false)}>
            <NavLink
              className={(navLink) =>
                navLink.isActive ? "nav_link nav_link_active" : "nav_link"
              }
              to="/help"
            >
              Help
            </NavLink>
          </li>
          <li className="join_now_cta" onClick={() => setOpen(true)}>
            Join Now
          </li>
          <QueryForm open={open} setOpen={setOpen} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
