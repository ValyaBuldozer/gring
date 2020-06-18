import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	root: {
		height: 40,
		padding: '0 10px',
		width: '100%',
		'&::-webkit-media-controls-panel': {
			borderRadius: 0,
			height: 40
		}
	}
}));

interface Props {
	src: string
}

export default function AudioPlayer({ src }: Props) {
	const classes = useStyles();

	return (
		<audio
			className={classes.root}
			src={`/assets/${src}`}
			controls/>
	);
}
