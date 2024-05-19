import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import cross from "../../assets/images/addcircle.png";
import { initialState } from "./Availability";

const AvailabilityCard = ({
  index,
  availabilities,
  setAvailabilities,
  isUpdateClinic,
}) => {
  const nextHourStartTime = moment()
    .add(1, "hour")
    .minutes(0)
    .format("hh:mm A");
  const nextHourEndTime = moment().add(2, "hour").minutes(0).format("hh:mm A");

  const initialState = {
    startTime: availabilities[index]?.startTime
      ? moment(availabilities[index]?.startTime, "HH:mm").format("hh:mm A")
      : nextHourStartTime,
    endTime: availabilities[index]?.endTime
      ? moment(availabilities[index]?.endTime, "HH:mm").format("hh:mm A")
      : nextHourEndTime,
  };
  console.log("Availabilities", availabilities);

  const [startTime, setStartTime] = useState(initialState.startTime);
  const [endTime, setEndTime] = useState(initialState.endTime);

  function onClickCross() {
    setAvailabilities((prev) => {
      const newState = [...prev];
      newState?.splice(index, 1);
      return newState;
    });
  }

  function onClickAddMoreAvailability() {
    setAvailabilities((prev) => [...prev, initialState.availability]);
  }

  function onChangeStartTime(e) {
    setStartTime(
      (prev) =>
        `${moment(e.target.value, "HH:mm").format("hh:mm")} ${
          prev.split(" ")[1]
        }`
    );
  }

  function onChangeEndTime(e) {
    setEndTime(
      (prev) =>
        `${moment(e.target.value, "HH:mm").format("hh:mm")} ${
          prev.split(" ")[1]
        }`
    );
  }

  function onChangeStartTimeMeridian(e) {
    setStartTime((prev) => `${prev.split(" ")[0]} ${e.target.value}`);
  }

  function onChangeEndTimeMeridian(e) {
    setEndTime((prev) => `${prev.split(" ")[0]} ${e.target.value}`);
  }

  function handleWeekdays(e) {
    const weekday = e.target.value?.toUpperCase();
    setAvailabilities((prev) => {
      const newState = [...prev];
      const foundIndex = newState[index]?.days?.findIndex(
        (day) => day === weekday
      );
      if (foundIndex > -1) {
        newState[index]?.days?.splice(foundIndex, 1);
      } else {
        newState[index]?.days?.push(weekday);
      }
      return newState;
    });
  }

  function handleStartTime() {
    // console.log(
    //   "handleStartTime",
    //   moment(startTime, "hh:mm A").format("HH:mm")
    // );
    setAvailabilities((prev) => {
      const newState = [...prev];
      newState[index].startTime = moment(startTime, "hh:mm A").format("HH:mm");
      return newState;
    });
  }

  function handleEndTime() {
    // console.log("handleEndTime", moment(endTime, "hh:mm A").format("HH:mm"));
    setAvailabilities((prev) => {
      const newState = [...prev];
      newState[index].endTime = moment(endTime, "hh:mm A").format("HH:mm");
      return newState;
    });
  }

  useEffect(() => {
    handleStartTime();
  }, [startTime]);

  useEffect(() => {
    handleEndTime();
  }, [endTime]);

  if (!availabilities[index]) return <></>;

  return (
    <div className="availibility_card">
      {index !== 0 && (
        <img
          className="aviability_cross"
          src={cross}
          alt=""
          onClick={onClickCross}
        />
      )}
      <div className="mb-2 date_select_heading">Create Availability</div>
      <div className="availability_box d-flex justify-content-center">
        <div className="w-75 d-flex justify-content-evenly">
          <div className="time_slot">
            <>
              <label htmlFor="timefrom" className="timefrom">
                From*
              </label>
              <input
                type="time"
                name="startTime"
                className="without_ampm"
                value={startTime.split(" ")[0]}
                onChange={onChangeStartTime}
                required
              />
            </>

            <input
              id="toggle-on-left"
              className="toggle toggle-left"
              value="AM"
              type="radio"
              onChange={onChangeStartTimeMeridian}
              checked={startTime?.split(" ")[1] === "AM"}
              required
            />
            <label htmlFor="toggle-on-left" className="daytime_label">
              AM
            </label>
            <input
              id="toggle-off-right"
              className="toggle toggle-right"
              value="PM"
              type="radio"
              onChange={onChangeStartTimeMeridian}
              checked={startTime?.split(" ")[1] === "PM"}
              required
            />
            <label htmlFor="toggle-off-right" className="daytime_label">
              PM
            </label>
          </div>
          <div className="time_slot">
            <label htmlFor="timeto" className="timefrom">
              To*
            </label>
            <input
              type="time"
              name="endTime"
              className="without_ampm"
              value={endTime?.split(" ")[0]}
              onChange={onChangeEndTime}
              required
            />

            <input
              id="toggle-on"
              className="toggle toggle-left"
              value="AM"
              type="radio"
              required
              onChange={onChangeEndTimeMeridian}
              checked={endTime?.split(" ")[1] === "AM"}
            />
            <label htmlFor="toggle-on" className="daytime_label">
              AM
            </label>
            <input
              id="toggle-off"
              className="toggle toggle-right"
              value="PM"
              type="radio"
              required
              onChange={onChangeEndTimeMeridian}
              checked={endTime?.split(" ")[1] === "PM"}
            />
            <label htmlFor="toggle-off" className="daytime_label">
              PM
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-3 date_select_heading">Select Day</div>
      <div style={{ marginLeft: "20%" }} className="d-flex ">
        <div className="weekDays-selector">
          <input
            type="checkbox"
            id="weekday-mon"
            className="weekday"
            onChange={handleWeekdays}
            value="Monday"
          />
          <label htmlFor="weekday-mon" className="weekdays_label">
            Mon
          </label>
          <input
            type="checkbox"
            id="weekday-tue"
            className="weekday"
            onChange={handleWeekdays}
            value="Tuesday"
          />
          <label htmlFor="weekday-tue" className="weekdays_label">
            Tue
          </label>
          <input
            type="checkbox"
            id="weekday-wed"
            className="weekday"
            onChange={handleWeekdays}
            value="Wednesday"
          />
          <label htmlFor="weekday-wed" className="weekdays_label">
            Wed
          </label>
          <input
            type="checkbox"
            id="weekday-thu"
            className="weekday"
            onChange={handleWeekdays}
            value="Thursday"
          />
          <label htmlFor="weekday-thu" className="weekdays_label">
            Thu
          </label>
          <input
            type="checkbox"
            id="weekday-fri"
            className="weekday"
            onChange={handleWeekdays}
            value="Friday"
          />
          <label htmlFor="weekday-fri" className="weekdays_label">
            Fri
          </label>
          <input
            type="checkbox"
            id="weekday-sat"
            className="weekday"
            onChange={handleWeekdays}
            value="Saturday"
          />
          <label htmlFor="weekday-sat" className="weekdays_label">
            Sat
          </label>
          <input
            type="checkbox"
            id="weekday-sun"
            className="weekday"
            onChange={handleWeekdays}
            value="Sunday"
          />
          <label htmlFor="weekday-sun" className="weekdays_label">
            Sun
          </label>
        </div>
      </div>
      {!isUpdateClinic && index == availabilities?.length - 1 && (
        <div
          className="availibility_add_more"
          onClick={onClickAddMoreAvailability}
        >
          Add More Availability
        </div>
      )}
    </div>
  );
};

export default AvailabilityCard;
