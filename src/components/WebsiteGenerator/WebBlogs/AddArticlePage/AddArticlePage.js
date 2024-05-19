import React from "react";
import "./AddArticlePage.css";
const AddArticlePage = ({ setPageName, setActiveStep }) => {
  return (
    <div className="add_article_page">
      <h1>Add articles or blogs</h1>
      <div
        className="add_article_box"
        onClick={() => setPageName("articleEditor")}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M30.3125 1.68421C30.3125 0.754048 31.0665 0 31.9967 0V0C32.9269 0 33.6809 0.754047 33.6809 1.68421V62.3158C33.6809 63.246 32.9269 64 31.9967 64V64C31.0665 64 30.3125 63.246 30.3125 62.3158V1.68421Z"
            fill="white"
          />
          <rect
            y="32"
            width="3.36842"
            height="64"
            rx="1.68421"
            transform="rotate(-90 0 32)"
            fill="white"
          />
        </svg>
      </div>
      <p onClick={() => setPageName("articleEditor")}>New Article</p>
      <button onClick={() => setActiveStep(6)}>Next</button>
    </div>
  );
};

export default AddArticlePage;
