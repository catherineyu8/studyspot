import { initializeApp } from "firebase/app";
import Navbar from "./Navbar";

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

/**
 * This is the highest level component!
 */
function App() {
	return (
		<div className="App">
			<p className="App-header">
				{/* this part appears across all screens no matter what! */}
				<h1>welcome to study spot!</h1>
			</p>
			<Navbar />
			{/* TODO: add authroute/login component */}
		</div>
	);
}

export default App;
