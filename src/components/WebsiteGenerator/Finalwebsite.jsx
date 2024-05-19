import React from "react";
import { useParams } from "react-router-dom";

function Finalwebsite() {
  const { id } = useParams();

  return (
    <iframe
      src={`${window.location.origin}/static-site.html?doctorId=${id}`}
      title="Final Website"
      width="100%"
      height="100%"
      style={{
        border: "none",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
}

export default Finalwebsite;
