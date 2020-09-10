import React from "react";
import "./Header.css";

function Header(props) {
	return (
		<header className="header">
			<h1 className="title">How Long</h1>
			<p className="subtitle">
				Keep track of how long to/since an event.
			</p>
		</header>
	);
}

export default Header;
