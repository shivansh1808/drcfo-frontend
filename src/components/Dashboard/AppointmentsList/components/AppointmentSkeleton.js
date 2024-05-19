import { Skeleton } from "@mui/material";
import React from "react";

export default function AppointmentSkeleton() {
  return (
    <div>
      <div className="appointment--card">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          sx={{ marginRight: "10px" }}
        />
        <Skeleton
          variant="rectangular"
          width={300}
          height={20}
          sx={{ alignSelf: "flex-start" }}
        />

        <Skeleton variant="rounded" width={110} height={40} />
      </div>
      <Skeleton variant="rectangular" width={"100%"} height={2} />
    </div>
  );
}
