export function rgba(r: number, g: number, b: number, a: number): string {
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function hsl(hue: number, saturation: number, lightness: number): string {
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
