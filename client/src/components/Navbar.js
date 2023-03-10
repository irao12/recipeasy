import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Spoon from "../assets/icons/silverware-spoon.svg";
import LogOutIcon from "../assets/icons/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<div
				className="logo"
				onClick={() => {
					navigate("/");
				}}
			>
				<img src={Spoon} alt="spoon" className="logo-spoon" />
				<h1 className="logo-text">Recipeasy</h1>
			</div>
			<ul className="nav-links">
				<li className="nav-link">
					<Link to="/findrecipes">Find Recipes</Link>
				</li>
				<li className="nav-link">
					<Link to="/favorites">Favorites</Link>
				</li>

				<li className="nav-link">
					{auth.isAuthenticated ? (
						<Link to="/account">Account</Link>
					) : (
						<Link to="/login">Log In</Link>
					)}
				</li>

				{auth.isAuthenticated && (
					<>
						<li
							title="Log Out"
							onClick={() => {
								auth.signout();
								navigate("/login");
							}}
						>
							<img
								src={LogOutIcon}
								className="log-out"
								alt="logout"
							/>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
