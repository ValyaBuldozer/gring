import React from 'react';
import JssStyleSheet from '../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import useStore from '../stores/useStore';
import ObjectsList from './ObjectsList';
import { TextField } from '@material-ui/core';

const styles: JssStyleSheet = {
    screen: {
        height: '100%',
        width: '100%'
    },
    appBar: {
        height: 70,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px 10px',
        borderBottom: '1px solid slategray'
    },
    searchInput: {
        width: '100%'
    },
    list: {
        height: '100%'
    }
}

const useStyles = createUseStyles(styles);

const ObjectsScreen = observer(() => {
    const { objects: store } = useStore();
    const classes = useStyles();

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
            </div>
            <div className={classes.list}>
                <ObjectsList/>
            </div>
        </div>
    )
});

export default ObjectsScreen;
