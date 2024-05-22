import { useState } from "react";
import Home from "./tabs/Home";
import Search from "./tabs/Search";
import Add from "./tabs/Add";
import Profile from "./tabs/Profile";

// define an enum to represent which page we are currently on.
enum Page {
	HOME = "HOME",
	SEARCH = "SEARCH",
	ADD = "ADD",
	PROFILE = "PROFILE",
}

/**
 * This is the component for the nav bar at the top of the page and it chooses
 * which page to display
 * @returns the HTML for the navigation bar
 */
export default function Navbar() {
	// use a "variable" for the navbar to keep track of the current page
	const [page, setPage] = useState<Page>(Page.HOME);

	return (
		<div>
			<div className="Navbar">
				{/* set the page variable on navbar button clicks! */}
				<button onClick={() => setPage(Page.HOME)}>home</button>
				<button onClick={() => setPage(Page.SEARCH)}>search</button>
				<button onClick={() => setPage(Page.ADD)}>
					add study spot
				</button>
				<button onClick={() => setPage(Page.PROFILE)}>profile</button>
			</div>

			{/* display the page based on page variable */}
			{page === Page.HOME ? <Home /> : null}
			{page === Page.SEARCH ? <Search /> : null}
			{page === Page.ADD ? <Add /> : null}
			{page === Page.PROFILE ? <Profile /> : null}
		</div>
	);
}
