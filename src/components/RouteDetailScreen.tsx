import * as React from "react";
import JssStyleSheet from "../util/types/JssStyleSheet";
import {createUseStyles} from 'react-jss';
import {RouterProps, useParams, withRouter} from "react-router";
import useStore from "../stores/useStore";
import Route from "../types/Route";
import {observer} from "mobx-react-lite";
import {Box} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

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
				<Box className={classes.description}>
					{route.description}
				</Box>
			</div>
		</div>
	)
}

export default withRouter(observer(RouteDetailScreen));
