import * as React from 'react';
import Review from '../../types/Review';
import ReviewCard, {ReviewCardSkeleton} from './ReviewCard';
import {getFetchPath} from '../../util/fetch';
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px 0'
	},
	item: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	placeholder: {
		width: '100%',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		fontSize: 16
	},
	controls: {
		height: 50,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	btn: {
		fontWeight: 'bold'
	}
}));

interface Props {
	entityId: number;
	limit?: number | null;
}

export default function ReviewList({ entityId, limit = null }: Props) {

	const classes = useStyles();

	const [reviews, setReviews] = React.useState<Review[] | null>(null);

	React.useEffect(() => {
		fetch(getFetchPath('/api/reviews', { object: entityId, limit }))
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(`${res.status}`);
				}
			})
			.then((rev) => setReviews(rev))
			.catch(err => console.error(err));
	}, []);

	if (reviews == null) {
		return (
			<div className={classes.root}>
				<ReviewCardSkeleton/>
				<ReviewCardSkeleton/>
			</div>
		)
	}

	if (reviews.length < 1) {
		return (
			<div className={classes.root}>
				<div className={classes.placeholder}>
					Отзывов пока нет. Станьте первым!
				</div>
				<div className={classes.controls}>
					<Button
						className={classes.btn}
						variant="contained"
						size='small'
						color="primary"
						style={{ color: '#FFF' }}>
						Добавить отзыв
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className={classes.root}>
			{
				reviews.slice(0, limit ?? 0).map((review, index) => (
					<ReviewCard className={classes.item} review={review} key={index}/>
				))
			}
			<div className={classes.controls}>
				<Link to={`/reviews/${entityId}`}>
					<Button
						className={classes.btn}
						variant="text"
						size='small'
						color="primary">
						Показать все
					</Button>
				</Link>
				<Button
					className={classes.btn}
					variant="contained"
					size='small'
					color="primary"
					style={{ color: '#FFF' }}>
					Добавить отзыв
				</Button>
			</div>
		</div>
	)
}
