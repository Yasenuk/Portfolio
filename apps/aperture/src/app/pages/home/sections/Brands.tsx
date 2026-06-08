const BRANDS_LIST = [
	"hill-hayes",
	"riksgransen",
	"studio-cai",
	"chill-tndustries",
	"stockholm"
];

export default function Brands() {
	return (
		<div className="bg-black">
			<section className="container pt-20 pb-16 md:pt-[7.5rem] md:pb-[6.25rem]">
				<h2 className="text-center text-primary text-[2.5rem] bottom-4">Past clients</h2>
				<p className="text-center text-secondary text-2xl">Trusted by your favourite companies</p>
				<div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-x-20 gap-y-10 mt-10">
					{BRANDS_LIST.map(brand => (
						<img className="" src={`/assets/brands/${brand}.svg`} alt={`${brand} logo`} />
					))}
				</div>
			</section>
		</div>
	);
}