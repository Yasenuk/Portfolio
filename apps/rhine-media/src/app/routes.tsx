import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout/layout';

const Home = lazy(() => import('./pages/home/home'));
const Contacts = lazy(() => import('./pages/contacts/contacts'));
const Terms = lazy(() => import('./pages/legal/terms'));
const Privacy = lazy(() => import('./pages/legal/privacy'));

const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
				<Layout />
			</Suspense>
		),
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/contacts', element: <Contacts /> },
			{ path: '/terms', element: <Terms /> },
			{ path: '/privacy-policy', element: <Privacy /> }
		],
	},
]);

export default router;