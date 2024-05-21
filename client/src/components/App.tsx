import { initializeApp } from "firebase/app";

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
				<h1>Study Spot</h1>
			</p>
			{/* <Relevant Component /> */}
		</div>
	);
}

export default App;
