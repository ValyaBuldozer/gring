import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavBar from "./NavBar";

const ObjectsScreen = React.lazy(() =>
	import(/* webpackChunkName: "ObjectsScreen" */ './objects/ObjectsScreen')
);
const RoutesScreen = React.lazy(() =>
	import(/* webpackChunkName: "RoutesScreen" */ './routes/RoutesScreen')
);
const RoutesDetailScreen = React.lazy(() =>
	import(/* webpackChunkName: "RouteDetailScreen" */ './routes/RouteDetailScreen')
);
const ObjectDetailScreen = React.lazy(() =>
	import(/* webpackChunkName: "ObjectDetailScreen" */ './objects/ObjectDetailScreen')
);
const ReviewsDetailScreen = React.lazy(() =>
	import(/* webpackChunkName: "ReviewDetailScreen" */ './review/ReviewDetailScreen')
);
const MapScreen = React.lazy(() =>
	import(/* webpackChunkName: "MapScreen" */ './map/MapScreen')
);
const UserScreen = React.lazy(() =>
	import(/* webpackChunkName: "UserScreen" */ './user/UserScreen')
);

const useStyles = makeStyles({
	appShell: {
		width: '100%',
		height: '100%',
		position: 'relative'
	},
	panel: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 65
	},
	navbar: {
		display: 'flex',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingTop: 8,
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 65,
		overflow: 'hidden'
	}
});

export default function AppShell() {
	const classes = useStyles();

	return (
		<Router>
			<div className={classes.appShell}>
				<Typography component='div'>
					<div className={classes.panel}>
						<React.Suspense fallback={'Loading'}>
							<Switch>
								<Route exact path='/routes' component={RoutesScreen}/>
								<Route exact path='/routes/:id' component={RoutesDetailScreen}/>
								<Route exact path="/objects" component={ObjectsScreen}/>
								<Route exact path="/objects/:id" component={ObjectDetailScreen}/>
								<Route exact path='/reviews/:id' component={ReviewsDetailScreen}/>
								<Route exact path='/map' component={MapScreen}/>
								<Route exact path='/user' component={UserScreen}/>
								<Route exact path="/404" render={() => '404'}/>
								<Route path="/" component={ObjectsScreen}/>
							</Switch>
						</React.Suspense>
					</div>
					<NavBar className={classes.navbar}/>
				</Typography>
			</div>
		</Router>
	)
}
