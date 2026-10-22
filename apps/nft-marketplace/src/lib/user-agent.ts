const BROWSERS: ReadonlyArray<[RegExp, string]> = [
	[/Edg[eA]?\//, 'Edge'],
	[/OPR\/|Opera/, 'Opera'],
	[/Firefox\//, 'Firefox'],
	[/Chrome\//, 'Chrome'],
	[/Safari\//, 'Safari'],
];

const SYSTEMS: ReadonlyArray<[RegExp, string]> = [
	[/Windows NT/, 'Windows'],
	[/iPhone|iPad|iPod/, 'iOS'],
	[/Android/, 'Android'],
	[/Mac OS X/, 'macOS'],
	[/Linux/, 'Linux'],
];

function match(ua: string, table: ReadonlyArray<[RegExp, string]>) {
	return table.find(([re]) => re.test(ua))?.[1];
}

export function formatUserAgent(ua: string | null): string {
	if (!ua) return 'Unknown device';

	const browser = match(ua, BROWSERS);
	const system = match(ua, SYSTEMS);

	if (browser && system) return `${browser} on ${system}`;
	return browser ?? system ?? 'Unknown device';
}
