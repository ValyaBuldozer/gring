import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useStore from '../stores/useStore';
import useLocaleString from '../hooks/useLocaleString';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 30,
		width: '50%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: ({ isVisited }: any) => ({
		color: isVisited ? theme.palette.secondary.main : theme.palette.text.secondary,
		fontSize: 14,
		paddingLeft: 10
	})
}));

interface Props {
	entityId: number;
}

function VisitedPlaceControl({ entityId }: Props) {
	const { user: userStore } = useStore();
	const localeString = useLocaleString();
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(!userStore.isInitialized);

	const isVisited = userStore.visitedPlaces?.some(e => e.id == entityId) ?? false;
	const classes = useStyles({ isVisited });

	React.useEffect(() => {
		setIsLoading(!userStore.isInitialized);
	}, [userStore.isInitialized]);

	const onClick = async () => {
		if (isLoading) {
			return;
		}

		if (!userStore.isAuthorized) {
			history.push('/user');
			return;
		}

		setIsLoading(true);
		if (isVisited) {
			await userStore.removeFromVisitedPlaces(entityId);
		} else {
			await userStore.addToVisitedPlaces(entityId);
		}
		setIsLoading(false);
	};

	return (
		<div className={classes.root} onClick={onClick}>
			{
				isLoading ? (
					<CircularProgress size={14} color='secondary' thickness={3}/>
				) : isVisited ? (
					<CheckIcon color='secondary' fontSize='small'/>
				) : (
					<CheckCircleIcon color='disabled' fontSize='small'/>
				)
			}
			<div className={classes.title}>
				{isVisited ? localeString.PLACE_VISITED_MESSAGE : localeString.PLACE_NOT_VISITED_MESSAGE}
			</div>
		</div>
	)
}

export default observer(VisitedPlaceControl);
