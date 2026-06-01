import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./layout/Layout";

const  Home = lazy(() => import("./pages/home/Home"));

const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
				<Layout />
			</Suspense>
		),
		children: [
			{ path: "/", element: <Home /> },
		]
	}
]);

export default router;