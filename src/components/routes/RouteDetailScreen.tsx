import * as React from "react";
import {RouteComponentProps, useParams, withRouter} from "react-router";
import useStore from "../../stores/useStore";
import Route from "../../types/Route";
import {observer} from "mobx-react-lite";
import {Box} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import RouteInfo from "./RouteInfo";
import RouteObjectListCard from "./RouteObjectListCard";
import {Link} from "react-router-dom";
import ReviewList from "../review/ReviewList";
import DetailScreenWrapper from "../util/DetailScreenWrapper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	logo: {
		height: 190,
		width: '100%',
		objectFit: 'cover'
	},
	info: {
		padding: '5px 15px'
	},
	name: {
		color: theme.palette.text.primary,
		fontSize: 26,
		fontWeight: 'bold',
	},
	rating: {
		color: theme.palette.text.secondary,
		display: "flex",
		alignItems: 'center',
		padding: '5px 0'
	},
	controls: {
		padding: '5px 0',
		justifyContent: 'space-between'
	},
	secondaryTitle: {
		fontSize: 16,
		color: theme.palette.text.secondary,
		fontWeight: 'bold',
		padding: '10px 15px'
	}
}));

interface Props extends RouteComponentProps {
}

function RouteDetailScreen({ history }: Props) {
	const { id } = useParams();
	const { routes: store } = useStore();

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
		<DetailScreenWrapper title={route.name}>
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
				<Box>
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
		</DetailScreenWrapper>
	)
}

export default withRouter(observer(RouteDetailScreen));
