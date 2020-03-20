import * as React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import {Typography} from '@material-ui/core';
import RouteIcon from "./icons/RouteIcon";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
		bottom: 50
	},
	navbar: {
		display: 'flex',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'space-around',
		alignItems: 'center'
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
								<Route exact path="/404" render={() => '404'}/>
								<Route path="/" component={ObjectsScreen}/>
							</Switch>
						</React.Suspense>
					</div>
					<BottomNavigation className={classes.navbar}>
						<Link to='/objects'>
							<BottomNavigationAction label="Места" icon={<PlaceIcon/>}/>
						</Link>
						<Link to='/routes'>
							<BottomNavigationAction label="Маршруты" icon={<RouteIcon fontSize='large'/>}/>
						</Link>
					</BottomNavigation>
				</Typography>
			</div>
		</Router>
	)
}
