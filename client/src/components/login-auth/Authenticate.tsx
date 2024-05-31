import { useState } from "react";
import LoginLogout from "./LoginLogout";
// import InitialQuiz from "../InitialQuiz";
// import Home from "../tabs/Home";
import Navbar from "../Navbar";

function Authenticate() {
	const [authenticated, setAuthenticated] = useState(false);

	// USEFUL FOR PLAYWRIGHT TESTING PURPOSES: auto sets authing to true in test environment
	if (!authenticated && import.meta.env.VITE_APP_NODE_ENV === "test") {
		setAuthenticated(true);
	}

	return (
		<div>
			{/* LoginLogout will set the authenticated var depending on email used */}
			<LoginLogout
				authenticated={authenticated}
				setAuthenticated={setAuthenticated}
			/>
			{authenticated ? <Navbar /> : null}
		</div>
	);
}

export default Authenticate;
