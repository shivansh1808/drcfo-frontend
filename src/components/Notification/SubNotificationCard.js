import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SubNotificationCard = ({ note, creationDate }) => {
  const date = new Date(note?.createdAt);
  const today = new Date();
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const initials = note?.patient?.name?.charAt(0).toUpperCase();

  return (
    <div
      className={
        note?.read == "Notified"
          ? "notification_card new_notifier"
          : "notification_card"
      }
    >
      {note?.title ? (
        <div className="d-flex justify-content-around ">
          <div className="request--card--profile initials_box">{initials}</div>
          <div>
            <h2 className="">
              <span className="booke_name">{note?.title}</span> {note?.message}
            </h2>
            <div className="notification_time">{creationDate}</div>
          </div>
        </div>
      ) : (
        <Skeleton animation="wave" />
      )}
    </div>
  );
};

export default SubNotificationCard;
