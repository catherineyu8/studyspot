import { getLoginCookie } from "../../utils/cookie";

/**
 * This is the component for the home page
 * @returns the HTML for the home page
 */
export default function Home() {
	const USER_ID = getLoginCookie() || "";

	return (
		<div className="Home">
			<p>this is the home page for uid {USER_ID}!</p>
		</div>
	);
}
