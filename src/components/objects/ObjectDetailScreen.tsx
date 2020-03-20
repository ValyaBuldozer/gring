import * as React from 'react';
import Obj from '../../types/Object';
import {RouteComponentProps, useParams, withRouter} from 'react-router';
import {Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ObjectRoutesList from './ObjectRoutesList';
import ReviewList from '../review/ReviewList';
import {observer} from "mobx-react-lite";
import useStore from "../../stores/useStore";
import DetailScreenWrapper from "../DetailScreenWrapper";
import {Skeleton} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import theme from "../../styles/theme";

interface State {
	showDescription: boolean;
}

const useStyles = makeStyles<typeof theme, State>(theme => ({
	logo: {
		height: 190,
		width: '100%',
		objectFit: 'cover'
	},
	name: {
		textTransform: 'uppercase',
		fontSize: 26,
		fontWeight: "bolder",
		textAlign: 'center'
	},
	rating: {
		padding: 5,
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
		boxShadow: ({showDescription}) => showDescription ? 'unset' : 'inset 0 -8px 9px -6px grey',
		maxHeight: ({showDescription}) => showDescription ? 'unset' : 200,
		overflowY: ({showDescription}) => showDescription ? 'unset' : 'hidden'
	},
	title: {
		textAlign: 'left',
		width: '100%',
		textTransform: 'uppercase',
		fontSize: 23,
		padding: '5px 15px'
	},
	routes: {
		width: '100%'
	},
    skeletonRoot: {
	    overflowY: 'hidden'
    }
}));

interface Props extends RouteComponentProps {
}


function ObjectDetailScreen({history}: Props) {

	const {id} = useParams();
	const {objects: store} = useStore();

	const [object, setObject] = React.useState<Obj | null>(null);
	const [showDescription, setShowDescription] = React.useState(false);

	const classes = useStyles({showDescription} as State);

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
				<Rating value={object.rating.average} size='large'/>
				<Box>({object.rating.count})</Box>
			</div>
			<Box className={classes.description}>
				{object.description}
			</Box>
			{
				!showDescription ? (
					<Box
						fontWeight="bolder"
						textAlign='center'
						onClick={() => setShowDescription(!showDescription)}>
						Показать полностью
					</Box>
				) : null
			}
			<Box className={classes.title} fontWeight='bolder'>
				МАРШРУТЫ
			</Box>
			<div className={classes.routes}>
				<ObjectRoutesList objectId={object.id}/>
			</div>
			<Box className={classes.title} fontWeight='bolder'>
				ОТЗЫВЫ
			</Box>
			<ReviewList entityId={object.id} limit={2}/>
		</DetailScreenWrapper>
	)
}

function ObjectDetailScreenSkeleton() {
	const classes = useStyles({showDescription: false});

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

export default withRouter(observer(ObjectDetailScreen));
