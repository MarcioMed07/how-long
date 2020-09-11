import React, { useState } from "react";
import "./Content.css";
import EventCard from "../EventCard/EventCard";
import CardHolder from "../CardHolder/CardHolder";
import { formatISO, parseISO } from "date-fns";

let initialEvents = JSON.parse(localStorage.getItem("events") || "[]");
initialEvents.map((event) => {
	event.date = parseISO(event.date);
});
let events = initialEvents;

function exportData() {
	const file = new Blob([JSON.stringify(events)], {
		type: "application/json",
	});
	const fileName = "how_long_" + formatISO(new Date(), { format: "basic" });
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveOrOpenBlob(file, fileName);
		return;
	}
	const a = document.createElement("a");
	const url = URL.createObjectURL(file);
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	});
}

function importData() {
	const input = document.getElementById("import-input");
	// input.click();
}

function proccessData(event) {
	const file = event.target.files[0];
	console.log(file);
	const fr = new FileReader();
	fr.onload = (e) => {
		console.log(e);
		const result = JSON.parse(e.target.result);
		console.log(result);
	};

	fr.readAsText(file);
}

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
			<div className="data-buttons">
				<button
					onClick={() => {
						exportData();
					}}
				>
					Export
				</button>
				<button
					onClick={() => {
						importData();
					}}
				>
					Import
				</button>
				<input
					id="import-input"
					type="file"
					accept="application/json"
					multiple={false}
					onChange={(event) => {
						proccessData(event);
					}}
					hidden
				/>
			</div>
			<CardHolder>
				{cards}
				<EventCard creator={true} addEvent={addEvent} />
			</CardHolder>
		</div>
	);
}

export default Content;
