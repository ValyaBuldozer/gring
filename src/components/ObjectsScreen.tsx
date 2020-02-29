import React from 'react';
import JssStyleSheet from '../util/types/JssStyleSheet';
import {createUseStyles} from 'react-jss';
import {observer} from 'mobx-react-lite';
import useStore from '../stores/useStore';
import ObjectsList from './ObjectsList';
import {TextField} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import CategoriesFilter from './CategoriesFilter';
import Button from "@material-ui/core/Button";
import SelectDialog from "./SelectDialog";
import SortBy from "../util/types/SortBy";
import SearchBar from "./SearchBar";

const SORT_OPTIONS: SortBy[] = [
    SortBy.DEFAULT, SortBy.NAME, SortBy.DISTANCE, SortBy.RATING_COUNT, SortBy.RATING_AVG
];

const styles: JssStyleSheet = {
    screen: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    appBar: {
        height: 75,
        width: '100%',
        padding: '5px 10px 0 10px',
        display: 'grid',
        gridTemplate: `
            "search-bar" 40px
            "categories" 30px / 100%
        `
    },
    searchInput: {
        gridArea: 'search-bar'
    },
    categories: {
        gridArea: "categories"
    }
};

const useStyles = createUseStyles(styles);

const ObjectsScreen = observer(() => {
    const { objects: store } = useStore();
    const classes = useStyles();

    return (
        <div className={classes.screen}>
            <div className={classes.appBar}>
                <SearchBar
                    className={classes.searchInput}
                    sortBy={store.sortBy}
                    sortByOptions={SORT_OPTIONS}
                    searchString={store.searchString}
                    onSearchStringChange={store.setSearchString}
                    onSortByChange={store.setSortBy}/>
                <div className={classes.categories}>
                    <CategoriesFilter/>
                </div>
            </div>
            <ObjectsList/>
        </div>
    )
});

export default ObjectsScreen;
