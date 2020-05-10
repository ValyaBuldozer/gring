import * as React from 'react';
import {RouteBase} from '../../types/Route';
import {Avatar, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import RouteInfo from "./RouteInfo";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Skeleton } from "@material-ui/lab";
import cn from '../../util/classnames';


const useStyles = makeStyles(theme => ({
	cardRoot: {
		minHeight: 100,
		display: 'grid',
		gridTemplate: `
            "avatar name" 1fr
            "avatar rating" auto
            "controls controls" 30px / 70px 1fr
        `,
		borderBottom: `1px solid ${theme.palette.divider}`,
		padding: ' 0 10px',
		color: theme.palette.text.primary,
		'&:first-of-type': {
			borderTop: `1px solid ${theme.palette.divider}`
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
		height: 30,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	skeletonName: {
		alignSelf: 'center',
		height: 30,
		marginLeft: 10
	}
}));

interface Props {
	route: RouteBase;
}

export default function RoutesListCard({route}: Props) {
	const classes = useStyles();

	return (
		<Link to={`/routes/${route.id}`} key={route.id} className={classes.cardRoot}>
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
		</Link>
	)
}

export function RouteListCardSkeleton() {
	const classes = useStyles();

	return (
		<div className={classes.cardRoot}>
			<Skeleton className={classes.avatar} variant='circle' height={60} width={60}/>
			<Skeleton className={cn(classes.name, classes.skeletonName)}/>
			<div className={classes.controls}>
				{
					new Array(3).fill(
						<Skeleton variant='rect' height={20} width={80}/>
					)
				}
			</div>
		</div>
	)
}
