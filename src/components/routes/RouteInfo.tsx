import * as React from 'react';
import {RouteBase} from "../../types/Route";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import {Box} from "@material-ui/core";
import {formatMeters, formatTimeToMinutes} from "../../util/formatter";
import PlaceIcon from "@material-ui/icons/Place";
import HomeIcon from "@material-ui/icons/Home";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	control: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		fontSize: 13,
		whiteSpace: 'nowrap'
	},
	controlTitle: {
		paddingLeft: 5
	}
}));

interface Props {
	route: RouteBase;
	className?: string;
}

export default function RouteInfo({route, className = ''}: Props) {
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className}`}>
			<div className={classes.control}>
				<QueryBuilderIcon/>
				<Box className={classes.controlTitle}>
					{formatTimeToMinutes(route.duration)}
				</Box>
			</div>
			<div className={classes.control}>
				<PlaceIcon/>
				<Box className={classes.controlTitle}>
					{formatMeters(route.distance)}
				</Box>
			</div>
			<div className={classes.control}>
				<HomeIcon/>
				<Box className={classes.controlTitle}>
					{route.placesCount} объектов
				</Box>
			</div>
		</div>
	)
}
