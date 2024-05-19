import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import SlotCreatedModal from "./SlotCreatedModal";
import axios from "../../axios";
const CreateSlot = () => {
	const { id } = useParams();
	const [fromdayTime, setFromDayTime] = useState("AM");
	const [todayTime, setToDayTime] = useState("PM");
	const [timefrom, setTimeFrom] = useState("10:00");
	const [timeto, setTimeTo] = useState("12:00");
	const [weekdays, setWeekdays] = useState({ days: [] });
	const [slotsCount, setSlotsCount] = useState("");
	const [finalarray, setFinalArray] = useState({});
	const [room, setRoom] = useState([]);
	const navigate = useNavigate();
	const [clinic, setClinic] = useState({});
	const [modalIsOpen, setIsOpen] = useState(false);
	const docterId = localStorage.getItem("doctor_id");
	const [error, setError] = useState(false);
	const getStartTime = (e) => {
		console.log(e.target.value);
		var ts = e.target.value;
		var H = +ts.substr(0, 2);
		var h = H % 12 || 12;
		h = h < 10 ? "0" + h : h;
		ts = h + ts.substr(2, 3);
		setTimeFrom(ts);
		console.log(ts);
	};
	const getEndTime = (e) => {
		var ts = e.target.value;
		var H = +ts.substr(0, 2);
		var h = H % 12 || 12;
		h = h < 10 ? "0" + h : h;
		ts = h + ts.substr(2, 3);
		setTimeTo(ts);
		console.log(ts);
	};
	useEffect(() => {
		// fetch(
		//   `https://drco-all-backend-617u.onrender.com/get/allslots?docterId=${docterId}`
		// )
		//   .then((res) => res.json())
		//   .then((data) => {
		//     setRoom(data);
		//     console.log(data);
		//   });
		axios.get(`/get/allslots`).then((res) => {
			setRoom(res.data);
			console.log(res.data);
		});
		const rooms = Object.assign({}, ...room);
		// avail(rooms);
	}, [timefrom, fromdayTime, timeto, todayTime]);
	var final = [];
	// const avail = (room) => {
	//   const from = timefrom.concat(fromdayTime);
	//   const to = timeto.concat(todayTime);
	//   const hourstart = moment(from, ["h:mm A"]).format("HH:mm");
	//   const hourend = moment(to, ["h:mm A"]).format("HH:mm");
	//   console.log(hourstart, hourend);
	//   let slot = [];
	//   for (var key in room) {
	//     let avilable = room[key]
	//       .map((item) => item.split("-"))
	//       .some(
	//         ([bookedStart, bookedEnd]) =>
	//           (hourstart >= bookedStart && hourend < bookedEnd) ||
	//           (hourend > bookedStart && hourend <= bookedEnd) ||
	//           (bookedStart >= hourstart && bookedStart < hourend)
	//       );
	//     var chars = key.slice(0, key.search(/\d/));
	//     var numbers = key.replace(chars, "");
	//     slot = avilable == false ? slot : numbers;
	//   }
	//   const isBooked = slot.length > 0 ? true : false;
	//   // console.log(isBooked);
	//   final.push({
	//     slot: `${from}-${to}`,
	//     available: isBooked,
	//     space: slot,
	//   });
	//   const finalarray = Object.assign({}, ...final);
	//   console.log(finalarray);
	//   setFinalArray(finalarray);
	// };

	const handlefromdayTimeChange = (e) => {
		const fromdayTimevalue = e.currentTarget.value;
		setFromDayTime(fromdayTimevalue);
	};
	const handletodayTimeChange = (e) => {
		const todayTimevalue = e.currentTarget.value;
		setToDayTime(todayTimevalue);
	};

	const handleweekdays = (e) => {
		const { value, checked } = e.target;
		const { days } = weekdays;
		if (checked) {
			setWeekdays({
				days: [...days, value],
			});
		} else {
			setWeekdays({
				days: days.filter((e) => e !== value),
			});
		}
	};

	const getSlotsCount = (e) => {
		setSlotsCount(e.target.value);
		// console.log(e.target.value);
	};

	const handleSubmit = async (e) => {
		console.log(finalarray);
		// e.target.reset();
		// if (finalarray.available == false) {
		e.preventDefault();
		const from = { timefrom, fromdayTime };
		const to = { timeto, todayTime };
		const appointment = {
			...weekdays,
			from: from,
			to: to,
			patients: slotsCount,
		};

		const slots = { clinicId: id, slot: appointment };
		await axios.post(`/add/slot`, slots).then((res) => {
			console.log(res.data);
			if (res.data.message == "ERROR in slot") {
				setError(true);
			} else if (res.data.message == "SUCCESS") {
				setIsOpen(true);
			}
		});
	};
	useEffect(() => {
		const intervalId = setInterval(() => {
			setError(false);
		}, 3000);

		return () => clearInterval(intervalId);
	}, [error]);

	return (
		<div>
			<form>
				<div
					id="slots_collector"
					className="availability_form container d-flex justify-content-center flex-column"
				>
					<h1>Availablity</h1>
					<p>It’s going to take only few minutes</p>
					{error ? (
						<Alert sx={{ width: "55%", margin: "auto" }} severity="error">
							You have a overlapping slot in other clinic
						</Alert>
					) : null}
					<h4 className="mb-2 mt-2">Create Slot</h4>
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
										defaultValue={timefrom}
										onChange={getStartTime}
										required
									/>
								</>

								<input
									id="toggle-on-left"
									className="toggle toggle-left"
									value="AM"
									type="radio"
									onChange={handlefromdayTimeChange}
									checked={fromdayTime === "AM"}
								/>
								<label htmlFor="toggle-on-left" className="daytime_label">
									AM
								</label>
								<input
									id="toggle-off-right"
									className="toggle toggle-right"
									value="PM"
									type="radio"
									onChange={handlefromdayTimeChange}
									checked={fromdayTime === "PM"}
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
									defaultValue={timeto}
									onChange={getEndTime}
									required
								/>

								<input
									id="toggle-on"
									className="toggle toggle-left"
									value="AM"
									type="radio"
									onChange={handletodayTimeChange}
									checked={todayTime === "AM"}
								/>
								<label htmlFor="toggle-on" className="daytime_label">
									AM
								</label>
								<input
									id="toggle-off"
									className="toggle toggle-right"
									value="PM"
									type="radio"
									onChange={handletodayTimeChange}
									checked={todayTime === "PM"}
								/>
								<label htmlFor="toggle-off" className="daytime_label">
									PM
								</label>
							</div>
						</div>
					</div>
					<h4 className="mb-3 mt-3 date_select_heading">Select Days</h4>
					<div className="d-flex justify-content-center">
						<div className="weekDays-selector">
							<input
								type="checkbox"
								id="weekday-mon"
								className="weekday"
								onChange={handleweekdays}
								value="Monday"
							/>
							<label htmlFor="weekday-mon" className="weekdays_label">
								Mon
							</label>
							<input
								type="checkbox"
								id="weekday-tue"
								className="weekday"
								onChange={handleweekdays}
								value="Tuesday"
							/>
							<label htmlFor="weekday-tue" className="weekdays_label">
								Tue
							</label>
							<input
								type="checkbox"
								id="weekday-wed"
								className="weekday"
								onChange={handleweekdays}
								value="Wednesday"
							/>
							<label htmlFor="weekday-wed" className="weekdays_label">
								Wed
							</label>
							<input
								type="checkbox"
								id="weekday-thu"
								className="weekday"
								onChange={handleweekdays}
								value="Thursday"
							/>
							<label htmlFor="weekday-thu" className="weekdays_label">
								Thu
							</label>
							<input
								type="checkbox"
								id="weekday-fri"
								className="weekday"
								onChange={handleweekdays}
								value="Friday"
							/>
							<label htmlFor="weekday-fri" className="weekdays_label">
								Fri
							</label>
							<input
								type="checkbox"
								id="weekday-sat"
								className="weekday"
								onChange={handleweekdays}
								value="Saturday"
							/>
							<label htmlFor="weekday-sat" className="weekdays_label">
								Sat
							</label>
							<input
								type="checkbox"
								id="weekday-sun"
								className="weekday"
								onChange={handleweekdays}
								value="Sunday"
							/>
							<label htmlFor="weekday-sun" className="weekdays_label">
								Sun
							</label>
						</div>
					</div>
					<div className="d-flex justify-content-center flex-column ">
						<h3 className="slot_num_header">
							How many Appointment do you want in the above slot?
						</h3>
						<div className="d-flex justify-content-center">
							<input
								className="slots_num"
								type="number"
								placeholder="Enter the number of appointment (eg. 20)"
								onChange={getSlotsCount}
							/>
						</div>
					</div>
					<div className="d-flex justify-content-center mt-5">
						<button className="create_slot_btn" onClick={handleSubmit}>
							Create Slot
						</button>
						<SlotCreatedModal modalIsOpen={modalIsOpen} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateSlot;
