import * as React from 'react';
import {observer} from 'mobx-react-lite';
import JssStyleSheet from '../util/types/JssStyleSheet';
import {createUseStyles} from 'react-jss';
import useStore from '../stores/useStore';
import RoutesList from './RoutesList';
import SearchBar from "./SearchBar";
import SortBy from "../util/types/SortBy";

const SORT_OPTIONS: SortBy[] = [
    SortBy.DEFAULT,
    SortBy.NAME,
    SortBy.TIME,
    SortBy.ROUTE_DISTANCE,
    SortBy.OBJECTS_COUNT,
    SortBy.RATING_AVG,
    SortBy.RATING_COUNT
];

const styles: JssStyleSheet = {
    root: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    appBar: {
        height: '50px',
        padding: '5px 10px'
    }
};

const useStyles = createUseStyles(styles);

function RoutesScreen() {
    const classes = useStyles();
    const { routes: store } = useStore();

    return (
        <div className={classes.root}>
            <SearchBar
                className={classes.appBar}
                sortBy={store.sortBy}
                sortByOptions={SORT_OPTIONS}
                searchString={store.searchString}
                onSearchStringChange={store.setSearchString}
                onSortByChange={store.setSortBy}/>
            <RoutesList/>
        </div>
    )
}

export default observer(RoutesScreen);
