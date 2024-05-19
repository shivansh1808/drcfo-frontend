import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import DashboardNav from "./DashboardNav/DashboardNav";
import ConsultCard from "../Consultation/ConsultCard";
const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [searchId, setSearchId] = useState("");
  const [open, setOpen] = useState(true);
  // console.log(searchText);
  useEffect(() => {
    if (searchText.length) {
      setSearchId("");
    }
  }, [searchText]);
  return (
    <div className="dashboard_sidebar_navigation">
      <Sidebar />
      <div className="dashboard_outlet">
        <DashboardNav />
        {/* {open ? <ConsultCard setOpen={setOpen} /> : null} */}
        <Outlet context={[searchText, searchId]} />
      </div>
    </div>
  );
};

export default Dashboard;
