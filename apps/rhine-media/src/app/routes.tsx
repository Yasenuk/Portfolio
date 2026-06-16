import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout/layout';
import Contacts from './pages/contacts/contacts';

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
			{ path: '/contacts', element: <Contacts /> }
		],
	},
]);

export default router;