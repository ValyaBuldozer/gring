import * as React from "react";
import JssStyleSheet from "../../util/types/JssStyleSheet";
import {createUseStyles} from 'react-jss';
import {RouterProps, useParams, withRouter} from "react-router";
import useStore from "../../stores/useStore";
import Route from "../../types/Route";
import {observer} from "mobx-react-lite";
import {Box} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import RouteInfo from "./RouteInfo";
import RouteObjectListCard from "./RouteObjectListCard";
import {Link} from "react-router-dom";
import ReviewList from "../review/ReviewList";

const styles: JssStyleSheet = theme => ({
	root: {
		height: '100%',
		width: '100%',
		overflowY: 'auto'
	},
	logo: {
		height: theme.dimensions.detail.logoHeight,
		width: '100%',
		objectFit: 'cover'
	},
	info: {
		padding: '5px 15px'
	},
	name: {
		color: theme.color.primary,
		fontSize: theme.dimensions.detail.titleFontSize,
		fontWeight: 'bold',
	},
	rating: {
		color: theme.color.secondary,
		display: "flex",
		alignItems: 'center',
		padding: '5px 0'
	},
	controls: {
		padding: '5px 0',
		justifyContent: 'space-between'
	},
	secondaryTitle: {
		fontSize: theme.dimensions.detail.secondaryTitleFontSize,
		color: theme.color.primary,
		fontWeight: 'bold',
		padding: '10px 15px'
	}
});

const useStyles = createUseStyles(styles);

interface Props extends RouterProps {
}

function RouteDetailScreen({history}: Props) {
	const {id} = useParams();
	const {routes: store} = useStore();

	const [route, setRoute] = React.useState<Route | null>();
	React.useEffect(() => {
		store.fetchDetailEntity(parseInt(id ?? ''))
			.then(fetchedRoute => {
				if (fetchedRoute != null) {
					setRoute(fetchedRoute);
				} else {
					history.push('/404');
				}
			})
	}, []);

	const classes = useStyles();

	if (route == null) {
		// todo : skeleton
		return <>loading...</>;
	}

	return (
		<div className={classes.root}>
			<img className={classes.logo} src={`/assets/${route.image}`}/>
			<div className={classes.info}>
				<Box className={classes.name}>{route.name}</Box>
				<div className={classes.rating}>
					<Rating
						size='medium'
						readOnly
						precision={0.5}
						value={route.rating.average}/>
					<span>({route.rating.count})</span>
				</div>
				<RouteInfo route={route} className={classes.controls}/>
				<Box className={classes.description}>
					{route.description}
				</Box>
			</div>
			{
				route.places.map((place, idx) => (
					<Link to={`/objects/${place.id}`} key={place.id}>
						<RouteObjectListCard
							obj={place}
							index={idx + 1}/>
					</Link>
				))
			}
			<Box className={classes.secondaryTitle}>
				Отзывы
			</Box>
			<ReviewList entityId={route.id} limit={2}/>
		</div>
	)
}

export default withRouter(observer(RouteDetailScreen));
