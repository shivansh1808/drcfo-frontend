import { socket } from "./socket";

export const socketEvents = ({ setValue }) => {
	socket.on("test", (data) => {
		console.log("test event received", data);
	});

	socket.on("notification", (data) => {
		console.log("notification event received", data);
		setValue((prev) => ({
			...prev,
			latestNotification: data,
		}));
	});
};
