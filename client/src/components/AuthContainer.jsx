import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/AuthContainer.css";

export default function AuthContainer() {
	const [register, setRegister] = useState(false);

	return (
		<div id="AuthContainer">
			{register ? (
				<Login register={register} setRegister={setRegister} />
			) : (
				<Register register={register} setRegister={setRegister} />
			)}
		</div>
	);
}
