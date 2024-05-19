import React, { useEffect, useState } from "react";
import "./WebGenManager.css";

const WebGenManager = () => {
  const [id, setId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setId(JSON.parse(atob(token.split(".")[1]))?.id ?? null);
  }, [id]);
  return (
    <div className="WebGenManager">
      <div className="WebGenManager_header">
        <h1>Manage your website</h1>
        <button
          onClick={() => {
            const baseUrl = window.location.origin;
            window.open(`${baseUrl}/doctor/${id}`, "_blank");
          }}
        >
          View Website
        </button>
      </div>
      <div className="manage_web_tabs">
        <span>Personal Details</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>Service Details</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>Clinic Details</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>Testimonials</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>FAQ</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>Blogs</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="manage_web_tabs">
        <span>Contact Details</span>
        <svg
          width={20}
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default WebGenManager;
