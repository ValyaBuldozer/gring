import * as React from 'react';
import useStore from '../../stores/useStore';
import {observer} from 'mobx-react-lite';
import RoutesListCard from './RouteListCard';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
	list: {
		height: '100%',
		width: '100%',
		overflowY: 'auto'
	}
});

function RoutesList() {

	const {routes: store} = useStore();
	const classes = useStyles();

	return (
		<div className={classes.list}>
			{
				store.routes.map(route => (
					<RoutesListCard route={route}/>
				))
			}
		</div>
	)
}

export default observer(RoutesList);
