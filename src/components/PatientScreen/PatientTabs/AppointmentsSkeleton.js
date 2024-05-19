import { Skeleton } from "@mui/material";
import React from "react";

export default function AppointmentsSkeleton() {
  return (
    <>
      <div className="appointment_card_demo">
        <Skeleton animation="wave" width="100%" />
        <Skeleton animation="wave" width="100%" className="mt-4" />
        <Skeleton animation="wave" width="100%" className="mt-4" />
      </div>
      <div className="appointment_card_demo">
        <Skeleton animation="wave" width="100%" />
        <Skeleton animation="wave" width="100%" className="mt-4" />
        <Skeleton animation="wave" width="100%" className="mt-4" />
      </div>
    </>
  );
}
