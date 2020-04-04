import * as React from "react";
import {Dialog, DialogTitle, List, ListItem, ListItemText} from "@material-ui/core";

interface Props<K extends string, V extends string> {
	variants: [K, V][];
	selectedVariant: K;
	title: string;
	open: boolean;
	onClose: (variant: K) => void;
}

export default function SelectDialog<K extends string, V extends string>(props: Props<K, V>) {
	const {variants, selectedVariant, title, open, onClose} = props;

	const handleClose = () => {
		onClose(selectedVariant);
	};

	const handleSelect = (item: K) => {
		onClose(item);
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="simple-dialog-title">
			<DialogTitle id="simple-dialog-title">
				{title}
			</DialogTitle>
			<List>
			{
				variants.map(([key, value]) => (
					<ListItem
						button
						selected={key === selectedVariant}
						onClick={() => handleSelect(key)}
						key={key}>
						<ListItemText primary={value}/>
					</ListItem>
				))
			}
			</List>
		</Dialog>
	)
}
