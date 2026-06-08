import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

export default function Layout() {
	return (
		<>
			<Suspense fallback={null}><Header /></Suspense>
			<main id="main-content">
				<Outlet />
			</main>
			<Suspense fallback={null}><Footer /></Suspense>
		</>
	);
}