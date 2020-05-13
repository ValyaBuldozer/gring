import * as React from "react";
import useLocaleString from '../../hooks/useLocaleString';

export default function MapScreen() {
	const localeString = useLocaleString();

	return (
		<div>
			{localeString.NOT_IMPLEMENTED}
		</div>
	)
}
