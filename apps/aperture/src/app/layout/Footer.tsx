import { Link } from "react-router-dom";
import { linkClass } from '@portfolio/aperture';
import { cn } from "@portfolio/shared-utils";
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
			<div className="container flex justify-between text-sm ">
				<div className="basis-1/2">
					<Link to="/">
						<img src="/logo.svg" alt="Logo" width="128" height="31" />
					</Link>
					<p className="mt-5">Photographers &amp; videographers capturing the world around us.</p>
				</div>
				<div className="flex gap-x-10 basis-1/2 justify-center">
					<nav className="" aria-label="Business areas">
						<h2 className="uppercase tracking-[0.125rem]">Business areas</h2>
						<ul>
							{BUSINES_AREAS_LINKS.map(link => (
								<li key={link.name} className="mt-2.5 text-primary">
									<Link to={link.href} className={linkClass()}>{link.name}</Link>
								</li>
							))}
						</ul>
					</nav>
					<nav className="" aria-label="Pages">
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
			<div className="container my-9 py-9 border-t border-b border-primary">
				<section>
					<h2 className="uppercase tracking-[0.125rem] text-primary">Subscribe to our newsletter</h2>
					<p className="mt-5">Read about all the things we do.</p>
				</section>

			</div>
			<div className="container flex items-center justify-between">
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