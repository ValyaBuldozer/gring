import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { observer } from 'mobx-react-lite';
import useStore from '../stores/useStore';
import useLocaleString from '../hooks/useLocaleString';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 30,
		width: '50%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: ({ isFavorite }: any) => ({
		color: isFavorite ? theme.palette.secondary.main : theme.palette.text.secondary,
		fontSize: 14,
		paddingLeft: 10
	})
}));

interface Props {
	entityId: number;
}

function FavoritesEntityControl({ entityId }: Props) {
	const { user: userStore } = useStore();
	const localeString = useLocaleString();
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(!userStore.isInitialized);

	const isFavorite = userStore.favorites?.some(e => e.id == entityId) ?? false;
	const classes = useStyles({ isFavorite });

	React.useEffect(() => {
		setIsLoading(!userStore.isInitialized);
	}, [userStore.isInitialized]);

	const onClick = async () => {
		if (!userStore.isAuthorized) {
			history.push('/user');
			return;
		}

		setIsLoading(true);
		if (isFavorite) {
			await userStore.removeFromFavorites(entityId);
		} else {
			await userStore.addToFavorites(entityId);
		}
		setIsLoading(false);
	};

	return (
		<div className={classes.root} onClick={onClick}>
			{
				isLoading ? (
					<CircularProgress size={14} color='secondary' thickness={3}/>
				) : isFavorite ? (
					<FavoriteIcon color='secondary' fontSize='small'/>
				) : (
					<FavoriteBorderIcon color='disabled' fontSize='small'/>
				)
			}
			<div className={classes.title}>
				{isFavorite ? localeString.FAVORITES_EXIST_MESSAGE : localeString.FAVORITES_NOT_EXIST_MESSAGE}
			</div>
		</div>
	)
}

export default observer(FavoritesEntityControl);
