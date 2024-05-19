import { Alert, Snackbar } from "@mui/material";
import React from "react";
import useAppContext from "../context/AppContext";

export default function AppSnackbar() {
  const { snackbar, setSnackbar } = useAppContext();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration || 3000}
      onClose={() => setSnackbar({ open: false })}
    >
      <Alert
        onClose={() => setSnackbar({ open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
