import * as React from 'react';
import { observer } from 'mobx-react-lite';
import JssStyleSheet from '../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import useStore from '../stores/useStore';
import RoutesList from './RoutesList';

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
}

const useStyles = createUseStyles(styles);

function RoutesScreen() {
    const classes = useStyles();

    const { routes: store } = useStore();

    return (
        <div>
            <RoutesList/>
        </div>
    )
}

export default observer(RoutesScreen);
