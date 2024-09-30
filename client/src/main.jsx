import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Page1 from "./components/Page1.jsx";
import Page2 from "./components/Page2.jsx";
import AuthContainer from "./components/AuthContainer.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <AuthContainer />,
			},
			{
				path: "/page1",
				element: <Page1 />,
			},
			{
				path: "/page2",
				element: <Page2 />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
