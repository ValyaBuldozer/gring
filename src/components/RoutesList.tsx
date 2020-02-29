import * as React from 'react';
import JssStyleSheet from '../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import useStore from '../stores/useStore';
import { observer } from 'mobx-react-lite';
import RoutesListCard from './RouteListCard';

const styles: JssStyleSheet = {

}

const useStyles = createUseStyles(styles);

function RoutesList() {

    const { routes: store } = useStore();
    const classes = useStyles();


    return (
        <div>
            {
                store.routes.map(route => (
                    <RoutesListCard route={route} key={route.id}/>
                ))
            }
        </div>
    )
}

export default observer(RoutesList);
