import { Outlet } from 'react-router-dom';
import { lazy } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));


export default function Layout() {
	return (
		<>
			
			<Footer />
		</>
	);
}