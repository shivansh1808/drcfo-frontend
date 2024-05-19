import React from "react";

export default function CrossButton({ onClick }) {
  return (
    <span
      style={{ position: "absolute", right: "0", top: "0", margin: "20px" }}
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        onClick={onClick}
      >
        <path
          d="M1 1L14.9996 14.9996"
          stroke="#194AF5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15.0015 1L1.00187 14.9996"
          stroke="#194AF5"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
