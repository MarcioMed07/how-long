import React, { useState, useEffect } from "react";
import { intervalToDuration, format, parseISO } from "date-fns";
import "./EventCard.css";

function formatTimer(date) {
	if (!date) {
		return;
	}
	const now = new Date();
	const duration = intervalToDuration({ start: date, end: now });
	const format = [
		"years",
		"months",
		"weeks",
		"days",
		"hours",
		"minutes",
		"seconds",
	];
	return (
		<>
			{format.map((f) => {
				return (
					<div key={f}>
						{duration[f]} {f}
					</div>
				);
			})}
			<div key="position"> {now > date ? "Since" : "Until"} </div>
		</>
	);
}

function EventCard(props) {
	function handleSubmit(e) {
		e.preventDefault();
		const event = {
			title: name,
			date: parseISO(date),
		};
		props.addEvent(event);
	}
	const event = props.event || { date: null };
	const [timer, setTimer] = useState(formatTimer(event.date));
	const [name, setName] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(formatTimer(event.date));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	if (props.creator) {
		return (
			<form className="event-card" onSubmit={handleSubmit}>
				<div className="event-card-timer">
					<div>New Event</div>
					<div>
						Date:
						<input
							required
							value={date}
							onChange={(e) => setDate(e.target.value)}
							type="datetime-local"
							step="1"
						/>
					</div>
					<div>
						Event Name:
						<input
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
						/>
					</div>
				</div>
				<input
					type="submit"
					value="Create Event"
					className="event-card-title"
					style={{ cursor: "pointer", padding: "1em" }}
				/>
			</form>
		);
	} else {
		return (
			<div className="event-card">
				<button
					className="delete-button material-icons-outlined"
					onClick={() => {
						props.removeEvent(props.event.key);
					}}
				>
					delete
				</button>
				<div className="event-card-timer">{timer}</div>
				<div className="event-card-title">
					<div>{event.title}</div>
					<div>{format(event.date, "Pp")}</div>
				</div>
			</div>
		);
	}
}

export default EventCard;
