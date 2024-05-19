import React, { useState, useEffect, useRef } from "react";
import "./WebClinicAvailability.css";
import moment from "moment";
import Spinner from "../../../Spinner";

const WebClinicAvailability = ({
	availability = {},
	setAvailability = () => {},
	onNextClick,
	addmoreAvaiability,
	loading,
}) => {
	const [localAvailability, setLocalAvailability] = useState(availability);

	const nextHourStartTime = moment()
		.add(1, "hour")
		.minutes(0)
		.format("hh:mm A");
	const nextHourEndTime = moment().add(2, "hour").minutes(0).format("hh:mm A");

	const initialState = {
		startTime: availability?.startTime
			? moment(availability?.startTime, "HH:mm").format("hh:mm A")
			: nextHourStartTime,
		endTime: availability?.endTime
			? moment(availability?.endTime, "HH:mm").format("hh:mm A")
			: nextHourEndTime,
	};

	const [startTime, setStartTime] = useState(initialState.startTime);
	const [endTime, setEndTime] = useState(initialState.endTime);

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
		setAvailability((prev) => {
			const newState = { ...prev };
			console.log(newState);
			const foundIndex = newState?.days?.findIndex((day) => day === weekday);
			if (foundIndex > -1) {
				newState?.days?.splice(foundIndex, 1);
			} else {
				newState?.days?.push(weekday);
			}
			return newState;
		});
	}

	function handleStartTime() {
		setAvailability((prev) => ({
			...prev,
			startTime: moment(startTime, "hh:mm A").format("HH:mm"),
		}));
	}

	function handleEndTime() {
		setAvailability((prev) => ({
			...prev,
			endTime: moment(endTime, "hh:mm A").format("HH:mm"),
		}));
	}

	const onChangeSlotsCount = (e) => {
		setAvailability((prev) => ({
			...prev,
			maxAppointments: e.target.value,
		}));
	};

	useEffect(() => {
		handleStartTime();
	}, [startTime]);

	useEffect(() => {
		handleEndTime();
	}, [endTime]);

	const ref = useRef();

	return (
		<div className="web_clinic_availibility_card">
			<h1 className="web_clinic_availibility_card_header">
				Fill in the information required below. It will just take few minutes.
			</h1>
			<div className="mb-2 web_date_select_heading">Create Slots</div>
			<form ref={ref}>
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
				<div className="mb-3 mt-3 web_date_select_heading">Select Day</div>
				<div className="d-flex justify-content-center">
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
				<div className="d-flex justify-content-center flex-column">
					<h3 className="web_slot_num_header">
						How many Appointment do you want in one hour?
					</h3>
					<div className="d-flex justify-content-center">
						<input
							className="slots_num"
							type="number"
							placeholder="Enter the number of appointment (eg. 20)"
							onChange={onChangeSlotsCount}
						/>
					</div>
				</div>
				<div className="save_next_cta">
					<button
						className="mx-3"
						onClick={(e) => {
							e.preventDefault();
							ref.current.reset();
							addmoreAvaiability();
						}}
					>
						Add More Availability
					</button>
					<button
						className="mx-3"
						onClick={(e) => {
							e.preventDefault();
							onNextClick();
						}}
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
							justifyContent: "center",
						}}
					>
						<span>Create Clinic</span>
						{loading && <Spinner />}
					</button>
				</div>
			</form>
		</div>
	);
};

export default WebClinicAvailability;
