import * as React from 'react';
import JssStyleSheet from '../../util/types/JssStyleSheet';
import {createUseStyles} from 'react-jss';
import useStore from '../../stores/useStore';
import {observer} from 'mobx-react-lite';
import RoutesListCard from './RouteListCard';
import {Link} from "react-router-dom";

const styles: JssStyleSheet = {
	list: {
		height: '100%',
		width: '100%',
		overflowY: 'auto'
	},

};

const useStyles = createUseStyles(styles);

function RoutesList() {

	const {routes: store} = useStore();
	const classes = useStyles();

	return (
		<div className={classes.list}>
			{
				store.routes.map(route => (
					<Link to={`/routes/${route.id}`} key={route.id}>
						<RoutesListCard route={route}/>
					</Link>
				))
			}
		</div>
	)
}

export default observer(RoutesList);
