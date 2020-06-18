import * as React from 'react';
import Obj from '../../types/Object';
import { RouteComponentProps, useHistory, useParams, withRouter } from 'react-router';
import { Box, Theme } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ObjectRoutesList from './ObjectRoutesList';
import ReviewList from '../review/ReviewList';
import { observer } from "mobx-react-lite";
import useStore from "../../stores/useStore";
import DetailScreenWrapper from "../util/DetailScreenWrapper";
import { Skeleton } from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocaleString from '../../hooks/useLocaleString';
import FavoritesEntityControl from '../FavoritesEntityControl';
import VisitedPlaceControl from '../VisitedPlaceControl';
import AudioPlayer from '../AudioPlayer';

interface State {
	showDescription: boolean;
}

const useStyles = makeStyles<Theme, State>(theme => ({
	logo: {
		height: 190,
		width: '100%',
		objectFit: 'cover'
	},
	name: {
		fontSize: 26,
		fontWeight: "bolder",
		textAlign: 'center',
		color: theme.palette.text.primary
	},
	rating: {
		padding: '5px 10px',
		width: '100%',
		height: 50,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	description: {
		width: '100%',
		padding: '0 13px',
		textAlign: 'justify',
		whiteSpace: 'pre-wrap',
		boxShadow: ({ showDescription }) => showDescription ? 'unset' : 'inset 0 -8px 9px -6px grey',
		maxHeight: ({ showDescription }) => showDescription ? 'unset' : 200,
		overflowY: ({ showDescription }) => showDescription ? 'unset' : 'hidden'
	},
	title: {
		textAlign: 'left',
		width: '100%',
		textTransform: 'capitalize',
		fontSize: 16,
		padding: '10px 15px',
		color: theme.palette.text.primary
	},
	routes: {
		width: '100%'
	},
	skeletonRoot: {
		overflowY: 'hidden'
	},
	controls: {
		height: 30,
		width: '100%',
		padding: '0 10px',
		display: 'flex'
	}
}));

function ObjectDetailScreen() {
	const { id } = useParams();
	const { objects: store } = useStore();
	const history = useHistory();

	const [object, setObject] = React.useState<Obj | null>(null);
	const [showDescription, setShowDescription] = React.useState(false);

	const classes = useStyles({ showDescription } as State);
	const localeString = useLocaleString();

	React.useEffect(() => {
		store.fetchDetailEntity(parseInt(id ?? ''))
			.then(obj => {
				if (obj != null) {
					setObject(obj);
				} else {
					history.push('/404');
				}
			})
	}, []);

	if (object == null) {
		return <ObjectDetailScreenSkeleton/>;
	}

	return (
		<DetailScreenWrapper title={object?.name ?? ''}>
			<img src={`/assets/${object.image}`} className={classes.logo}/>
			<Box className={classes.name}>
				{object.name}
			</Box>
			<div className={classes.rating}>
				<Rating value={object.rating.average} size='medium'/>
				<Box>({object.rating.count})</Box>
			</div>
			<div className={classes.controls}>
				<FavoritesEntityControl entityId={object.id}/>
				<VisitedPlaceControl entityId={object.id}/>
			</div>
			{
				object.audioguide ? (
					<AudioPlayer src={object.audioguide}/>
				) : null
			}
			<Box className={classes.description}>
				{object.description}
			</Box>
			{
				!showDescription ? (
					<Box
						fontWeight="bolder"
						textAlign='center'
						onClick={() => setShowDescription(!showDescription)}>
						{localeString.SHOW_ALL}
					</Box>
				) : null
			}
			<Box className={classes.title} fontWeight='bolder'>
				{localeString.ROUTES}
			</Box>
			<div className={classes.routes}>
				<ObjectRoutesList objectId={object.id}/>
			</div>
			<Box className={classes.title} fontWeight='bolder'>
				{localeString.REVIEWS}
			</Box>
			<ReviewList entityId={object.id} limit={2}/>
		</DetailScreenWrapper>
	)
}

function ObjectDetailScreenSkeleton() {
	const classes = useStyles({ showDescription: false });

	return (
		<div className={classes.skeletonRoot}>
			<Skeleton
				variant='rect'
				className={classes.logo}
				height={200}/>
			<Skeleton
				variant='text'
				className={classes.name}
				style={{
					margin: '10px 20px',
					height: 70
				}}/>
			<Skeleton
				variant='rect'
				style={{
					margin: '10px 20px',
					height: 300
				}}/>
		</div>
	)
}

export default observer(ObjectDetailScreen);
