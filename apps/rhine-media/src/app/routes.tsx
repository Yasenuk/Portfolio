import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout/layout';

const Home = lazy(() => import('./pages/home/home'));

const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
				<Layout />
			</Suspense>
		),
		children: [
			{ path: '/', element: <Home /> },
		],
	},
]);

export default router;