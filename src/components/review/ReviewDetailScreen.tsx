import * as React from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import Review from "../../types/Review";
import ReviewCard from "./ReviewCard";
import DetailScreenWrapper from "../util/DetailScreenWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStore from '../../stores/useStore';
import SplashScreen from '../SplashScreen';
import useLocaleString from '../../hooks/useLocaleString';

const useStyles = makeStyles(theme => ({
	list: {
		height: "auto",
		width: "100%",
		overflowY: 'auto',
		paddingTop: 10
	},
	item: {
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		borderBottomWidth: 1,
		'&:first-of-type': {
			borderTopWidth: 1
		}
	}
}));

interface Props extends RouteComponentProps {
}

function ReviewDetailScreen({ history }: Props) {
	const { id } = useParams();
	const { api } = useStore();
	const localeString = useLocaleString();
	const [reviews, setReviews] = React.useState<Review[] | null>(null);
	const classes = useStyles();

	React.useEffect(() => {
		(async () => {
			const res = await fetch(`/api/reviews?object=${id}`);

			if (res.ok) {
				setReviews(await res.json());
			} else if (res.status == 404) {
				history.push('/404');
			} else {
				throw new Error(`Can't fetch reviews list with id ${id}`);
			}
		})();
	}, []);

	if (reviews == null) {
		return <SplashScreen/>;
	}

	return (
		<DetailScreenWrapper
			title={localeString.REVIEWS}
			shareEnabled={false}
			showAlways>
			{
				reviews.map(review => (
					<ReviewCard
						key={review.user.id}
						className={classes.item}
						review={review}/>
				))
			}
		</DetailScreenWrapper>
	)
}

export default withRouter(ReviewDetailScreen);
