import Icon from "@portfolio/shared-ui/lib/icon";

export function ExifBar({ shutterSpeed, aperture, iso, location }: { shutterSpeed: string; aperture: string; iso: string; location: string }) {
	const icons = [
		{ name: "shutter-speed", width: 16, height: 16, value: shutterSpeed },
		{ name: "aperture", width: 16, height: 16, value: aperture },
		{ name: "iso", width: 32, height: 16, value: iso },
		{ name: "place-mark", width: 10, height: 16, value: location },
	];

	return (
		<ul className={`
			absolute bottom-10 right-0
			flex items-center gap-4
			justify-center w-full md:w-auto md:right-10
		`}>
			{icons.map((icon, index) => (
				<li key={index} className="flex items-start gap-2">
					<Icon name={icon.name} width={icon.width} height={icon.height} />
					<span className="text-primary text-xs">{icon.value}</span>
				</li>
			))}
		</ul>
	);
}