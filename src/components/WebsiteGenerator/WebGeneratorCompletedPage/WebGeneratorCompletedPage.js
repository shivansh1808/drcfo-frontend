import React, { useEffect } from "react";
import "./WebGeneratorCompletedPage.css";
import image from "../../../assets/images/livewebsite.svg";
const WebGeneratorCompletedPage = () => {
  const [id, setId] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setId(JSON.parse(atob(token.split(".")[1]))?.id ?? null);
  }, [id]);

  return (
    <div className="WebGeneratorCompletedPage_container">
      <h1>You are all set to go live!</h1>
      <img src={image} alt="dashboard_live" />
      <button
        onClick={() => {
          const baseUrl = window.location.origin;
          window.open(`${baseUrl}/doctor/${id}`, "_blank");
        }}
      >
        View Your Website
      </button>
    </div>
  );
};

export default WebGeneratorCompletedPage;
