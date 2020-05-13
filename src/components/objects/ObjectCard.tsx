import * as React from 'react';
import { ObjectBase } from '../../types/Object';
import { Box, Paper } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import makeStyles from "@material-ui/core/styles/makeStyles";


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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
		justifyContent: 'flex-start'
	},
	name: {
		textTransform: 'uppercase',
		color: theme.palette.text.primary
	},
	rating: {
		width: 'auto',
		display: 'flex',
		alignItems: 'center',
        fontSize: '12px',
        color: theme.palette.text.secondary
	}
}));

interface Props {
	obj: ObjectBase;
}

export default function ObjectCard({ obj }: Props) {

	const { name, rating, image } = obj;

	const classes = useStyles();

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
			</div>
		</Paper>
	)
}
