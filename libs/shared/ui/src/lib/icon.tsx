export default function Icon({ name, width = 20, height = 20, className, dir = "assets/icons" }: { name: string; width?: number; height?: number; className?: string; dir?: string }) {
	return (
		<svg className={className} width={width} height={height}>
			<use href={`/${dir}/${name}.svg`} width={width} height={height} />
		</svg>
	);
}