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

const SORT_OPTIONS: [SortBy, string][] = [
    [SortBy.DEFAULT, 'По умолчанию'],
    [SortBy.NAME, 'По имени'],
    [SortBy.DISTANCE, 'По расстоянию'],
    [SortBy.RATING_COUNT, 'По количеству отзывов'],
    [SortBy.RATING_AVG, 'По средней оценке']
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
            "input sort" 40px
            "categories categories" 30px / 1fr 35px
        `
    },
    searchInput: {
        gridArea: 'input',
        width: '100%'
    },
    sort: {
        gridArea: 'sort',
        alignSelf: 'center',
        justifySelf: 'center'
    },
    categories: {
        gridArea: "categories"
    },
    btn: {
        height: '100%',
        width: '100%',
        minWidth: 0
    }
};

const useStyles = createUseStyles(styles);

const ObjectsScreen = observer(() => {
    const { objects: store } = useStore();
    const classes = useStyles();

    const [sortOpen, setSortOpen] = React.useState(false);

    const sortDialogOnClose = (variant: SortBy) => {
        store.setSortBy(variant);
        setSortOpen(false);
    };

    return (
        <div className={classes.screen}>
            <div className={classes.appBar}>
                <TextField
                    className={classes.searchInput}
                    variant="outlined"
                    type="search"
                    placeholder="Поиск"
                    size="small"
                    value={store.searchString ?? ''}
                    onChange={({target}) => store.setSearchString(target.value)}/>
                <div className={classes.categories}>
                    <CategoriesFilter/>
                </div>
                <Button style={{minWidth: 0}}
                    className={`${classes.sort} ${classes.btn}`}
                    onClick={() => setSortOpen(true)}>
                    <SortIcon/>
                </Button>
            </div>
            <ObjectsList/>
            <SelectDialog
                variants={SORT_OPTIONS}
                selectedVariant={store.sortBy}
                title={'Сортировка'}
                open={sortOpen}
                onClose={sortDialogOnClose}/>
        </div>
    )
});

export default ObjectsScreen;
