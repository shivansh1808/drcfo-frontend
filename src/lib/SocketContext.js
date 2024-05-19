import React, { useContext, createContext, useState, useEffect } from "react";
import { getAppointment } from "../api/doctor";
import { getNotificationById, getNotifications } from "../api/notification";
import { initSockets } from "./socket";

const SocketContext = createContext({
  latestNotification: null,
  notification: [],
  latestAppointmentRequests: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [value, setValue] = useState({
    latestNotification: null,
    notifications: [],
    latestAppointmentRequests: null,
  });

  //	When the component mounts, initialize the socket
  useEffect(() => initSockets({ setValue }), [initSockets]);

  //	when the component mounts, get all old notifications
  useEffect(() => {
    getNotifications().then((data) => {
      setValue((prev) => ({
        ...prev,
        notifications: data?.notifications,
      }));
    });
  }, []);

  // When notification comes, get the notification data
  useEffect(() => {
    if (value.latestNotification) {
      const notificationId = value.latestNotification;
      // to prevent duplicate notifications (infinte loop)
      setValue((prev) => ({
        ...prev,
        latestNotification: null,
      }));

      getLatestNotificationData(notificationId);
      setValue((prev) => ({
        ...prev,
        latestNotification: null,
      }));
    }
  }, [value]);

  const getLatestNotificationData = async (id) => {
    const data = await getNotificationById(id);
    updateAppointmentRequests(data?.notification);
    setValue((prev) => ({
      ...prev,
      notifications: [data?.notification, ...prev?.notifications],
    }));
  };

  const updateAppointmentRequests = async (notificationData) => {
    try {
      const { appointment, category, type } = notificationData;
      if (
        appointment != null &&
        type === "DOCTOR" &&
        category === "APPOINTMENT_CREATED"
      ) {
        const data = await getAppointment(appointment);
        if (data?.data) {
          setValue((prev) => ({
            ...prev,
            latestAppointmentRequests: data?.data,
          }));
        } else {
          console.log("appointment not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SocketContext.Provider value={{ value }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket };
export default SocketProvider;
