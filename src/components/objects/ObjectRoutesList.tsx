import * as React from 'react';
import JssStyleSheet from '../../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import { RouteBase } from '../../types/Route';
import RouteCard from '../routes/RouteCard';
import { Divider } from '@material-ui/core';

interface Props {
    objectId: number;
}

export default function ObjectRoutesList({ objectId }: Props) {

    const [routes, setRoutes] = React.useState<RouteBase[]>([]);

    React.useEffect(() => {
        fetch(`/api/routes?object=${objectId}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.status.toString());
                }
            })
            .then((receivedRoutes: RouteBase[]) => {
                setRoutes(receivedRoutes);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <React.Fragment>
            {routes.map(route => (
                <>
                    <RouteCard key={route.id} route={route}/>
                    <Divider/>
                </>
            ))}
        </React.Fragment>
    )
}
