import io from "socket.io-client";
import { socketEvents } from "./events";

export const socket = io(process.env.REACT_APP_BACKEND_BASE_URL, {
	extraHeaders: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

export const initSockets = ({ setValue }) => {
	socketEvents({ setValue });
};
