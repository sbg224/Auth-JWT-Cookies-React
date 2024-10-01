import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
	const location = useLocation()

	return (
		<nav>
			<p>
				<Link to={"/"}>LoginChicks</Link>
			</p>
			<ul>
				<li>
					<Link to={"/page1"}>Page 1</Link>
				</li>
				<li>
					<Link to={"/page2"}>Page 2</Link>
				</li>
				{location.pathname !== "/" && (
          <li>
            <button type="button">Logout</button>
          </li>
        )}
			</ul>
		</nav>
	);
}
