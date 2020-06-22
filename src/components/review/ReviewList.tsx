import * as React from 'react';
import Review from '../../types/Review';
import ReviewCard, { ReviewCardSkeleton } from './ReviewCard';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStore from '../../stores/useStore';
import useLocaleString from '../../hooks/useLocaleString';
import { observer } from 'mobx-react-lite';
import ReviewDialog from './ReviewDialog';

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

function ReviewList({ entityId, limit = null }: Props) {
	const classes = useStyles();
	const { api, user: userStore } = useStore();
	const localeString = useLocaleString();
	const history = useHistory();

	const [reviews, setReviews] = React.useState<Review[] | null>(null);
	const [addReviewIsOpen, setAddReviewIsOpen] = React.useState(false);

	const userReview = userStore.reviewsList?.find(r => r.entity == entityId) ?? null;

	React.useEffect(() => {
		api.fetchReviews(entityId, limit)
			.then(reviews => setReviews(reviews));
	}, []);

	const addReview = () => {
		if (!userStore.isAuthorized) {
			// redirecting unauthorized users to user page
			history.push('/user');
			return;
		}

		setAddReviewIsOpen(true);
	};

	if (reviews == null) {
		return (
			<div className={classes.root}>
				<ReviewCardSkeleton/>
				<ReviewCardSkeleton/>
			</div>
		)
	}

	return (
		<div className={classes.root}>
			{
				reviews.length < 1 ? (
					<>
						<div className={classes.placeholder}>
							{localeString.NO_REVIEWS_PLACEHOLDER}
						</div>
						<div className={classes.controls}>
							<Button
								className={classes.btn}
								onClick={addReview}
								variant="contained"
								size='small'
								color="primary"
								style={{ color: '#FFF' }}>
								{localeString.ADD_REVIEW}
							</Button>
						</div>
					</>
				) : (
					<>
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
									{localeString.SHOW_ALL}
								</Button>
							</Link>
							<Button
								className={classes.btn}
								onClick={addReview}
								variant="contained"
								size='small'
								color="primary"
								style={{ color: '#FFF' }}>
								{userReview ? localeString.UPDATE_REVIEW : localeString.ADD_REVIEW}
							</Button>
						</div>
					</>
				)
			}
			<ReviewDialog
				prevReview={userReview}
				isOpen={addReviewIsOpen}
				onClose={() => setAddReviewIsOpen(false)}
				entityId={entityId}/>
		</div>
	)
}

export default observer(ReviewList);
