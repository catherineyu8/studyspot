import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addLoginCookie } from "../../utils/cookie";

// params that are received from Authenticate.tsx
export interface ILoginPageProps {
	authenticated: boolean;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// button to login, checks for correct email and sets authenticated var
const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
	const auth = getAuth();

	const signInWithGoogle = async () => {
		try {
			const response = await signInWithPopup(
				auth,
				new GoogleAuthProvider()
			);
			const userEmail = response.user.email || "";

			// Check if the email ends with the allowed domain
			if (userEmail.endsWith("@brown.edu")) {
				console.log(response.user.uid);
				// add unique user id as a cookie to the browser.
				addLoginCookie(response.user.uid);
				props.setAuthenticated(true);
			} else {
				// User is not allowed, sign them out and show a message
				await auth.signOut();
				console.log("User not allowed. Signed out.");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login-box">
			<button
				className="google-login-button"
				onClick={() => signInWithGoogle()}
				disabled={props.authenticated}
				style={{ marginTop: "10%" }}
			>
				Sign in with Google
			</button>
		</div>
	);
};

// button to logout, sets authenticated var to false
const Logout: React.FunctionComponent<ILoginPageProps> = (props) => {
	return (
		<div className="logout-box">
			<button
				className="SignOut"
				onClick={() => {
					props.setAuthenticated(false);
				}}
			>
				Sign Out
			</button>
		</div>
	);
};

// the actual thing that is called. displays Login button if not logged in, otherwise displays Logout button
const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
	return (
		<>
			{!props.authenticated ? (
				<Login {...props} />
			) : (
				<Logout {...props} />
			)}
		</>
	);
};

export default LoginLogout;
