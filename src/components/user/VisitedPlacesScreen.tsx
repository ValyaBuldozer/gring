import * as React from 'react';
import { useHistory } from 'react-router';
import useStore from '../../stores/useStore';
import useLocaleString from '../../hooks/useLocaleString';
import DetailScreenWrapper from '../util/DetailScreenWrapper';
import EntitiesList, { SkeletonEntitiesList } from '../EntitiesList';
import { observer } from 'mobx-react-lite';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
	list: {
		padding: '0 20px'
	}
}));

function VisitedPlacesScreen() {
	const history = useHistory();
	const classes = useStyles();
	const {user: store} = useStore();
	const localeString = useLocaleString();

	React.useEffect(() => {
		if (store.isInitialized && !store.isAuthorized) {
			history.push('/user');
			return;
		}
	}, [store.isInitialized]);

	return (
		<DetailScreenWrapper
			className={classes.list}
			title={localeString.VISITED_PLACES}
			shareEnabled={false}
			showAlways>
			{
				store.visitedPlaces ? (
					<EntitiesList entities={store.visitedPlaces}/>
				) : (
					<SkeletonEntitiesList length={8}/>
				)
			}
		</DetailScreenWrapper>
	)
}

export default observer(VisitedPlacesScreen);
