import React, { useState } from "react";
import "./Content.css";
import EventCard from "../EventCard/EventCard";
import CardHolder from "../CardHolder/CardHolder";
import { parseISO } from "date-fns";

let initialEvents = JSON.parse(localStorage.getItem("events") || "[]");
initialEvents.map((event) => {
	event.date = parseISO(event.date);
});
let events = initialEvents;

function Content(props) {
	function buildCards(events) {
		const cards = [];
		let i = 0;
		for (let event of events) {
			cards.push(
				<EventCard removeEvent={removeEvent} key={i} event={event} />
			);
			i++;
		}
		return cards;
	}
	function addEvent(event) {
		let key = Math.max(...events.map((e) => e.key), 0) + 1;
		event["key"] = key;
		events.push(event);
		localStorage.setItem("events", JSON.stringify(events));
		setCards(buildCards(events));
	}
	function removeEvent(key) {
		const index = events.findIndex((event) => event.key === key);
		if (index >= 0) {
			events.splice(index, 1);
			setCards(buildCards(events));
			localStorage.setItem("events", JSON.stringify(events));
		}
	}
	const [cards, setCards] = useState(buildCards(initialEvents));
	return (
		<div className="content">
			<CardHolder>
				{cards}
				<EventCard creator={true} addEvent={addEvent} />
			</CardHolder>
		</div>
	);
}

export default Content;
