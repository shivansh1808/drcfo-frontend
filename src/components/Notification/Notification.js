import React, { useEffect } from "react";
import moment from "moment/moment";
import { useSocket } from "../../lib/SocketContext";
import "./Notification.css";
import SubNotificationCard from "./SubNotificationCard";

const Notification = ({ setOpen }) => {
  const { value } = useSocket();

  useEffect(() => {
    console.log("new notification", value?.notifications);
  }, [value]);

  return (
    <div>
      {value?.notifications?.length > 0 &&
        value?.notifications?.map((note, index) => (
          <SubNotificationCard
            note={note}
            key={index}
            setOpen={setOpen}
            creationDate={
              moment(note?.createdAt).diff(moment(), "days") < 1
                ? moment(note?.createdAt).fromNow()
                : moment(note?.createdAt).format("DD MMM YYYY")
            }
          />
        ))}
    </div>
  );
};

export default Notification;
