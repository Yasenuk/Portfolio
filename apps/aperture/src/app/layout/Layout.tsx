import { Outlet } from 'react-router-dom';
import { lazy } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

export default function Layout() {
	return (
		<>
			<Header />
			<main id="main-content">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}