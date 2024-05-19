import "./DashboardNav.css";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import userjpg from "../../../assets/images/login_user.png";
import manageicon from "../../../assets/images/manageicon.png";
import searchicon from "../../../assets/images/dashboard_search_icon.png";
import dropArrow from "../../../assets/images/Arrow 9.png";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, NavLink } from "react-router-dom";
import Notification from "../../Notification/Notification";
import SuggestionPane from "./SuggestionPane/SuggestionPane";
import { getAppointments } from "../../../api/doctor";
import { appointmentFilter, appointmentStatus } from "../../../util/constants";
import { searchAppointments } from "../../../api/appointment";
const ClickOutHandler = require("react-onclickout");

function DashboardNav() {
  const location = useLocation();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [drop, setDrop] = useState(false);
  const [suggestionPaneOpen, setsuggestionPaneOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const clickOut = (e) => {
    setOpen(false);
    setView(false);
  };

  const onChangeSearch = async (e) => {
    // TODO: Debounce search
    // setSearch(e.target.value);
    const value = e.target.value;

    if (value.length < 2) {
      setAppointments([]);
      return;
    }

    const responseData = await searchAppointments(value);
    if (responseData?.data?.length > 0) {
      setAppointments(responseData?.data);
    }
  };

  function onClickLogout() {
    logout();
  }
  function closeSuggestion() {
    setsuggestionPaneOpen(false);
  }

  function handleAppointments() {
    setsuggestionPaneOpen(appointments?.length > 0);
  }

  useEffect(() => {
    handleAppointments();
  }, [appointments]);

  return (
    <div className="dashboard_nav">
      <div className="search--box ">
        <div className="search--bar">
          <img src={searchicon} alt="search" className="search--icon" />
          <input
            type="text"
            placeholder={"Search patient name, contact number..."}
            className="search--text"
            onChange={onChangeSearch}
          />
          {location.pathname === "/dashboard/legal" && (
            <div>
              <div
                className="legal-search-dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  setDrop(!drop);
                }}
              >
                Select Form
                <img src={dropArrow} alt="dropdown" />
              </div>
              <div
                style={{ display: `${drop ? "block" : "none"}` }}
                className="legal-search-dropdown-menu"
              >
                {/* <div> */}
                <div className="legal-search-dropdown-menu-div">
                  Patient Details
                </div>
                <hr />
                <div className="legal-search-dropdown-menu-div2">
                  Medical Record
                </div>
                {/* </div> */}
              </div>
            </div>
          )}
        </div>
        {suggestionPaneOpen ? (
          <ClickOutHandler onClickOut={closeSuggestion}>
            <SuggestionPane suggestions={appointments} />
          </ClickOutHandler>
        ) : null}
      </div>

      <div className="header_options">
        <div
          className="notification_icon"
          onClick={() => {
            setView(false);
            setOpen(!open);
          }}
        >
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path
              d="M28.205 21.1308L26.7466 18.71C26.4404 18.1704 26.1633 17.1496 26.1633 16.5517V12.8621C26.1616 11.2346 25.6991 9.64094 24.8294 8.26538C23.9596 6.88981 22.7182 5.78861 21.2487 5.08916C20.8737 4.4232 20.3266 3.87021 19.6648 3.48797C19.0029 3.10573 18.2505 2.90828 17.4862 2.91625C15.8966 2.91625 14.4675 3.77666 13.7091 5.13291C10.8654 6.5475 8.89665 9.47875 8.89665 12.8621V16.5517C8.89665 17.1496 8.61956 18.1704 8.31331 18.6954L6.8404 21.1308C6.25706 22.1079 6.12581 23.1871 6.49039 24.1787C6.84039 25.1558 7.67165 25.9142 8.75081 26.2787C11.58 27.2412 14.555 27.7079 17.53 27.7079C20.505 27.7079 23.48 27.2412 26.3091 26.2933C27.33 25.9579 28.1175 25.185 28.4966 24.1787C28.8758 23.1725 28.7737 22.0642 28.205 21.1308ZM21.6279 29.1808C21.3212 30.0298 20.7606 30.7638 20.0222 31.283C19.2838 31.8022 18.4035 32.0815 17.5008 32.0829C16.3487 32.0829 15.2112 31.6162 14.4091 30.785C13.9425 30.3475 13.5925 29.7642 13.3883 29.1662C13.5779 29.1954 13.7675 29.21 13.9716 29.2392C14.3071 29.2829 14.6571 29.3267 15.0071 29.3558C15.8383 29.4287 16.6841 29.4725 17.53 29.4725C18.3612 29.4725 19.1925 29.4287 20.0091 29.3558C20.3154 29.3267 20.6216 29.3121 20.9133 29.2683L21.6279 29.1808Z"
              fill="#8FAFEA"
            />
          </svg>
        </div>

        {view ? <div className="counter">12</div> : null}
        {/* <img src={bellicon} alt="messages" className="header--icon" /> */}
        {open && (
          <ClickOutHandler onClickOut={clickOut}>
            <div className="notification_container">
              <div className="notification_header">
                <h3>Notifications</h3>
              </div>
              <Notification
                // key={index}
                // item={item}
                // setSearchId={setSearchId}
                setOpen={setOpen}
              />
            </div>
          </ClickOutHandler>
        )}
        <span className="header--item dropdown">
          {[].length ? (
            <img src="" alt="user_image" className="user--icon" />
          ) : (
            <img src={userjpg} alt="" className="user--icon--demo" />
          )}

          <div className="header--dropdown">
            <NavLink to="doctordetails" className="naviagtor_link">
              <span className="header--dropdown--element header--dropdown--element--top">
                Manage Profile
                <img src={manageicon} alt="" className="manage_icon" />
              </span>
            </NavLink>
            <span className="header--dropdown--element" onClick={onClickLogout}>
              Logout
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default DashboardNav;
