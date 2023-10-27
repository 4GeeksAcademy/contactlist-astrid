import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Add a new contact</span>
			</Link>
			<div className="ml-auto">
				<Link to="/agenda">
					<button className="btn btn-success">Agenda</button>
				</Link>
			</div>
		</nav>
	);
};