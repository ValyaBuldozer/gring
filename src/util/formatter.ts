export function formatTimeToMinutes(seconds: number): string {
	return `${Math.round(seconds / 60)} мин`;
}

export function formatMeters(meters: number) {
	return meters >= 1000 ?
		`${Math.round(meters / 1000)}.${(meters % 1000).toString().substring(0, 1)} км` :
		`${Math.round(meters)} м`
}
