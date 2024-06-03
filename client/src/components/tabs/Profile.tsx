import { useEffect, useState } from "react";
import { getLoginCookie } from "../../utils/cookie";
import { getUserInfo } from "../../utils/api";

/**
 * This is the component for the profile page
 * @returns the HTML for the profile page
 */
export default function Profile() {
	const USER_ID = getLoginCookie() || "";
	const [userInfo, setUserInfo] = useState<Map<string, object>>(new Map()); // TODO: check if this works w bool??!

	useEffect(() => {
		getUserInfo().then((data) => {
			setUserInfo(data.user_info);
		});
	});

	return (
		<div className="Profile">
			<p>this is the profile page!</p>
			<div className="user-personal-info">
				<ul>
					{Object.entries(userInfo).map(([key, value]) => (
						<li key={key}>
							<strong>{key}:</strong> {JSON.stringify(value)}
						</li>
					))}
				</ul>
			</div>

			<div className="user-spots">
				{/* TODO: fill in this list w user's ranked spots! */}
				<ul id="user-spot-list"></ul>
			</div>
		</div>
	);
}
