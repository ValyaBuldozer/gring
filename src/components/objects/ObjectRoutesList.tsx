import * as React from 'react';
import {RouteBase} from '../../types/Route';
import {Divider} from '@material-ui/core';
import useStore from '../../stores/useStore';
import RouteListCard, { RouteListCardSkeleton } from '../routes/RouteListCard';

interface Props {
    objectId: number;
}

export default function ObjectRoutesList({ objectId }: Props) {
    const [routes, setRoutes] = React.useState<RouteBase[] | null>(null);
    const {api} = useStore();

    React.useEffect(() => {
        api.fetchRoutesByObjectId(objectId)
            .then((receivedRoutes: RouteBase[]) => {
                setRoutes(receivedRoutes);
            })
            .catch(err => console.error(err));
    }, []);

    if (routes == null) {
        return (
            <React.Fragment>
                <RouteListCardSkeleton/>
                <RouteListCardSkeleton/>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {routes.map(route => (
                <RouteListCard route={route} key={route.id}/>
            ))}
        </React.Fragment>
    )
}
