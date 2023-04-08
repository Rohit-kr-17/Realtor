import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const pathMatchRoute = (route) => {
		if (route === location.pathname) return true;
	};
	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-50">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
						alt="logo"
						className="h-5 cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>
				<div>
					<ul className="flex space-x-10">
						<li
							className={`${
								pathMatchRoute("/")
									? "cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-red-500"
									: "cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent"
							}`}
							onClick={() => navigate("/")}
						>
							Home
						</li>
						<li
							className={`${
								pathMatchRoute("/offers")
									? "cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-red-500"
									: "cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent"
							}`}
							onClick={() => navigate("/offers")}
						>
							Offers
						</li>
						<li
							className={`${
								pathMatchRoute("/sign-in")
									? "cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px] border-b-red-500"
									: "cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent"
							}`}
							onClick={() => navigate("/sign-in")}
						>
							SignIn
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
}

export default Header;
