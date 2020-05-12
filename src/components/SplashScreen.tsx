import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

export default function SplashScreen() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress/>
		</div>
	)
}
