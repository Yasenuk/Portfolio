import { Link } from 'react-router-dom';

import { Backdrop, BurgerMenu, BurgerMenuBody, Trigger } from '@portfolio/shared-ui';
import { linkClass } from '@portfolio/aperture';

const navLinks = [
	{ name: 'Business areas', to: '/' },
	{ name: 'Featured images', to: '/' },
	{ name: 'Gear cage', to: '/' },
	{ name: 'Contact', to: '/' },
] as const;

export default function Header() {
	return (
		<header className="bg-black text-primary">
			<div className="container flex items-center justify-between py-5">
				<Link to="/">
					<img src="/logo.svg" alt="Logo" width="128" height="31" />
				</Link>
				<BurgerMenu>
					<Trigger className="bg-primary" />
					<Backdrop className="bg-black/80" />
					<BurgerMenuBody className="items-center justify-center h-dvh gap-10 md:h-auto md:gap-4 lg:gap-5 md:text-base text-lg">
						<nav className={` flex flex-col items-center gap-10 md:gap-4 lg:gap-5 md:flex-row `}>
							{navLinks.map((link) => (
								<Link key={link.name} to={link.to} className={linkClass()}>
									{link.name}
								</Link>
							))}
						</nav>
						<button className={`
							px-4 py-2 bg-primary text-black rounded-[0.875rem] text-center border-2 border-primary
							hover:bg-black hover:text-primary transition-colors duration-300
						`}>
							Get template
						</button>
					</BurgerMenuBody>
				</BurgerMenu>
			</div>
		</header>
	);
}