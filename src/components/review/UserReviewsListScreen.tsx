import * as React from 'react';
import { useHistory } from 'react-router';
import useStore from '../../stores/useStore';
import useLocaleString from '../../hooks/useLocaleString';
import SplashScreen from '../SplashScreen';
import DetailScreenWrapper from '../util/DetailScreenWrapper';
import ReviewCard from './ReviewCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { observer } from 'mobx-react-lite';

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

function UserReviewsListScreen() {
	const { user: userStore } = useStore();
	const localeString = useLocaleString();
	const history = useHistory();
	const classes = useStyles();

	React.useEffect(() => {
		if (!userStore.isAuthorized && userStore.isInitialized) {
			// redirecting unauthorized users to user page
			history.push('/user');
			return;
		}
	}, [userStore.isAuthorized, userStore.isInitialized]);

	if (userStore.reviewsList == null) {
		return <SplashScreen/>;
	}

	return (
		<DetailScreenWrapper
			title={localeString.REVIEWS}
			shareEnabled={false}
			showAlways>
			{
				userStore.reviewsList.map(review => (
					<ReviewCard
						key={review.entity}
						className={classes.item}
						review={review}/>
				))
			}
		</DetailScreenWrapper>
	)
}

export default observer(UserReviewsListScreen);
