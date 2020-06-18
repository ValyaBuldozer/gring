import * as React from 'react';
import { ObjectBase, ObjectType } from '../../types/Object';
import { Box, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { formatMeters } from '../../util/formatter';
import useLocaleString from '../../hooks/useLocaleString';
import { observer } from 'mobx-react-lite';
import PlaceIcon from "@material-ui/icons/Place";
import useNetwork from '../../hooks/useNetwork';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
	card: {
		width: '100%',
		borderRadius: 5,
		margin: '10px 0'
	},
	logo: {
		width: '100%',
		height: 150,
		objectFit: 'cover',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	info: {
		padding: 7,
		display: 'grid',
		gridTemplate: `
			"name name" auto
			"rating distance" auto / 1fr 85px
		`
	},
	name: {
		gridArea: 'name',
		textTransform: 'uppercase',
		color: theme.palette.text.primary
	},
	rating: {
		gridArea: 'rating',
		width: 'auto',
		display: 'flex',
		alignItems: 'center',
        fontSize: '12px',
        color: theme.palette.text.secondary
	},
	distance: {
		gridArea: 'distance',
		color: theme.palette.text.secondary,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	distanceProgress: {
		gridArea: 'distance',
		justifySelf: 'center',
		alignSelf: 'center'
	}
}));

interface Props {
	obj: ObjectBase;
}

function ObjectCard({ obj }: Props) {
	const localeString = useLocaleString();
	const isOnline = useNetwork();
	const classes = useStyles();

	const { name, rating, image, distance, type } = obj;
	const isDistanceEnabled = isOnline && (type === ObjectType.PUBLIC_PLACE || type === ObjectType.PLACE);
	const isDistanceLoading = isDistanceEnabled && distance == null;

	return (
		<Paper className={classes.card} elevation={5} style={{ borderRadius: 10 }}>
			<img
				className={classes.logo}
				src={'/assets/' + image}
				{...{ loading: 'lazy' }} />
			<div className={classes.info}>
				<Box className={classes.name} fontWeight='fontWeightMedium'>
					{name}
				</Box>
				<div className={classes.rating}>
					<Rating value={rating.average} size='small' readOnly precision={0.5}/>
					<span>({rating.count})</span>
				</div>
				{
					isDistanceLoading ? (
						<CircularProgress
							size={14}
							thickness={3}
							color='primary'
							className={classes.distanceProgress}/>
					) : isDistanceEnabled && distance != null ? (
						<div className={classes.distance}>
							<PlaceIcon fontSize='small'/>
							{formatMeters(distance)} {distance > 1000 ? localeString.KILOMETERS : localeString.METERS}
						</div>
					) : null
				}
			</div>
		</Paper>
	)
}

export default observer(ObjectCard);
