export default function Login({ setRegister, register }) {
	return (
		<>
			<h1>Login</h1>
			<form action="submit">
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account?
				<button id="register" onClick={() => setRegister(!register)} type="button" >
					Register
				</button>
			</p>
		</>
	);
}
