import * as React from 'react';
import JssStyleSheet from '../../util/types/JssStyleSheet';
import {createUseStyles} from 'react-jss';
import {RouteBase} from '../../types/Route';
import {Avatar, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import RouteInfo from "./RouteInfo";

const styles: JssStyleSheet = theme => ({
	cardRoot: {
		minHeight: 100,
		display: 'grid',
		gridTemplate: `
            "avatar name" 1fr
            "avatar rating" auto
            "controls controls" 30px / 70px 1fr
        `,
		borderBottom: `1px solid ${theme.color.secondary}`,
		padding: ' 0 10px',
		color: theme.color.primary,
		'&:first-of-type': {
			borderTop: `1px solid ${theme.color.secondary}`
		}
	},
	avatar: {
		gridArea: 'avatar',
		height: 70,
		width: 70,
		alignSelf: 'center',
		justifySelf: 'center'
	},
	name: {
		gridArea: 'name',
		alignSelf: 'flex-end',
		fontWeight: 'bold'
	},
	rating: {
		gridArea: 'rating',
		alignSelf: 'center'
	},
	controls: {
		gridArea: 'controls',
		height: 30
	}
});

const useStyles = createUseStyles(styles);

interface Props {
	route: RouteBase;
}

export default function RoutesListCard({route}: Props) {
	const classes = useStyles();

	return (
		<div className={classes.cardRoot}>
			<Avatar
				className={classes.avatar}
				src={'/assets/' + route.image}
				style={{height: 50, width: 50}}/>
			<Box className={classes.name}>
				{route.name}
			</Box>
			<div className={classes.rating}>
				<Rating value={route.rating.average} precision={0.5} readOnly={true}/>
			</div>
			<RouteInfo route={route} className={classes.controls}/>
		</div>
	)
}
