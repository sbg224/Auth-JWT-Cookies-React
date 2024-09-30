export default function Register({ setRegister, register }) {
	return (
		<>
			<h1>Register</h1>
			<form action="submit">
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">Register</button>
			</form>
			<p>
				Don't have an account?
				<button id="register" onClick={() => setRegister(!register)} type="button">
					Login
				</button>
			</p>
		</>
	);
}
