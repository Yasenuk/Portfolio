import { Link } from "react-router-dom";
import { InputMain, linkClass } from '@portfolio/aperture';
import { Icon } from "@portfolio/shared-ui";

const BUSINES_AREAS_LINKS = [
	{ name: "Product photography", href: "/" },
	{ name: "Architecture photography", href: "/" },
	{ name: "Drone photography", href: "/" },
	{ name: "Wildlife photography", href: "/" }
] as const;

const PAGES_LINKS = [
	{ name: "Gear cage", href: "/" },
	{ name: "Featured images", href: "/" },
	{ name: "Contact", href: "/" },
	{ name: "Style guide", href: "/" },
	{ name: "Instructions", href: "/" },
	{ name: "Changelog", href: "/" }
] as const;

export default function Footer() {
	return (
		<footer className="bg-black text-secondary py-16 md:py-[6.25rem]">
			<div className="container flex justify-between text-sm text-center md:text-left flex-wrap gap-y-14">
				<div className="flex basis-full lg:basis-auto flex-col items-center lg:items-start">
					<Link to="/">
						<img src="/logo.svg" alt="Logo" width="128" height="31" />
					</Link>
					<p className="mt-5">Photographers &amp; videographers capturing the world around us.</p>
				</div>
				<div className="flex flex-wrap lg:flex-nowrap gap-y-8 basis-full lg:basis-[28.675rem] gap-x-10 justify-center mdjustify-between lg:justify-center text-center lg:text-left">
					<nav className="basis-80 md:basis-1/2" aria-label="Business areas">
						<h2 className="uppercase tracking-[0.125rem]">Business areas</h2>
						<ul>
							{BUSINES_AREAS_LINKS.map(link => (
								<li key={link.name} className="mt-2.5 text-primary">
									<Link to={link.href} className={linkClass()}>{link.name}</Link>
								</li>
							))}
						</ul>
					</nav>
					<nav className="basis-80 md:basis-1/2" aria-label="Pages">
						<h2 className="uppercase tracking-[0.125rem]">Pages</h2>
						<ul>
							{PAGES_LINKS.map(link => (
								<li key={link.name} className="mt-2.5 text-primary">
									<Link to={link.href} className={linkClass()}>{link.name}</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
			<div className="container my-9 py-9 border-t-2 border-b-2 border-primary text-center md:text-left flex items-center justify-center lg:justify-between flex-wrap gap-y-12">
				<section>
					<h2 className="uppercase tracking-[0.125rem] text-primary">Subscribe to our newsletter</h2>
					<p className="mt-5">Read about all the things we do.</p>
				</section>
				<InputMain />
			</div>
			<div className="container text-center md:text-left flex items-center justify-center lg:justify-between flex-wrap gap-y-12">
				<p>&copy; Aperture Photography, Inc. All rights reserved. Licensing.</p>
				<nav className="flex gap-x-5" aria-label="Social services">
					<Link to="/"><Icon className="text-secondary hover:text-primary transition-colors duration-300" name="twitter" height={24} /></Link>
					<Link to="/"><Icon className="text-secondary hover:text-primary transition-colors duration-300" name="instagram" height={24} /></Link>
					<Link to="/"><Icon className="text-secondary hover:text-primary transition-colors duration-300" name="facebook" height={24} /></Link>
				</nav>
			</div>
		</footer>
	);
}