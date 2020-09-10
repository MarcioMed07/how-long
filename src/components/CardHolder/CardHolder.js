import React from "react";
import "./CardHolder.css";

function CardHolder(props) {
	return (
		<div className="card-holder">
			{props.children}
		</div>
	);
}

export default CardHolder;
