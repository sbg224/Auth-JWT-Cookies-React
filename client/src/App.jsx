import { Outlet } from "react-router-dom";
import Animations from "./components/Animations";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
	return (
		<>
			<Navbar />
			<Animations />
			<div id="pages">
				<Outlet />
			</div>
		</>
	);
}

export default App;
