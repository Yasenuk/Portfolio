import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		const html = document.documentElement;
		const prev = html.style.scrollBehavior;
		html.style.scrollBehavior = 'auto';
		window.scrollTo(0, 0);
		html.style.scrollBehavior = prev;
	}, [pathname]);
	return null;
}

export default function Layout() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<main id="main-content">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
