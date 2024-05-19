import React, { useEffect, useState } from "react";
import "./ChatList.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ChatScreen from "../ChatScreen/ChatScreen";
import axios from "../../axios";

const ChatList = () => {
	const [patientsList, setPatientsList] = useState([]);

	const item ={
		_id : '1',
		detials: {
			name: 'Giriraj Roy',
			description : "This is the desc of the chat box This is the desc of the chat box"
		}

	}

	useEffect(() => {
		axios.get("/get/videoConsultation/rooms").then((res) => {
			console.log(res.data);
			setPatientsList(res.data.reverse());
		});

		let interval = setInterval(() => {
			axios.get("/get/videoConsultation/rooms").then((res) => {
				console.log("doc data", res.data);
				setPatientsList(res.data.reverse());
			});
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="chatList_screen">
			<div>
				<h1>Online Active Consultation</h1>
			</div>
			<div>
				{/* {patientsList.map((item, i) => ( */}
					{/* <NavLink to='/chatscreen/:i'>
						<ChatCard item={item} key={i}/>
					</NavLink> */}

					<NavLink to='/chatscreen/1'>
						<ChatCard item={item}/>
					</NavLink>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>
					<ChatCard item={item}/>

				{/* ))} */}
			</div>
		</div>
	);
};

export default ChatList;

const ChatCard = ({ item }) => {
	const navigate = useNavigate();
	// const initials = item.detials.name.charAt(0).toUpperCase();
	const initials = "GR";
	const setCall = (value) => {
		axios
			.post(`/get/selectDocter/docterResponse`, {
				roomId: item._id,
				response: value,
			})
			.then((res) => {
				if (res.value == "Accepted" && res.data.message == "Response saved") {
					navigate(`/chatscreen/${item._id}`);
				} else {
					console.log("rejected");
				}
			});
	};

	return (
		<div className="chat_card">
			<div className="d-flex">
				<div className="chat--card--profile">{initials}</div>
				<div className="ms-3">
					<h2>{item.detials.name}</h2>
					<p>{item.detials.description} </p>
				</div>
			</div>
			<div className="chat--card-time">
				2 hours Left
			</div>
			{/* <div>
				<button onClick={() => setCall("Rejected")}>decline</button>
				<button onClick={() => setCall("Accepted")}>accept</button>
			</div> */}
		</div>
	);
};
