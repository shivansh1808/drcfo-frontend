import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { defaultValues } from "../../util/constants";
import { getCurrentLocation } from "../../util/location";

const AppContext = createContext();

export default function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false });
  const [deviceLocation, setDeviceLocation] = useState({ lat: "", lng: "" });
  const [rerenderTimeSlots, setRerenderTimeSlots] = useState(false);

  async function onComponentLoad() {
    const currentLocation = await getCurrentLocation();
    if (currentLocation?.lat && currentLocation?.lng) {
      setDeviceLocation(currentLocation);
    }
  }

  function openSnackbar(snackbarProps) {
    // console.log("openSnackbar", snackbarProps);
    setSnackbar({
      ...defaultValues.snackbar,
      ...snackbarProps,
    });
  }

  useEffect(() => {
    onComponentLoad();
  }, []);

  const value = {
    snackbar,
    setSnackbar,
    deviceLocation,
    openSnackbar,
    rerenderTimeSlots,
    setRerenderTimeSlots,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
