import { CircularProgress } from "@mui/material";
import React from "react";

export default function Spinner({ color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: color || "white" }} size="1.25rem" />
    </div>
  );
}
