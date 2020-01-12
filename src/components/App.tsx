import * as React from 'react';
import {createUseStyles} from 'react-jss'
import AppShell from './AppShell';
import storesContext from '../stores/storeContext';
import ObjectsStore from '../stores/ObjectsStore';
import useStore from '../stores/useStore';

const useStyles = createUseStyles({
    appRoot: {
        height: '100vh',
        width: '100vw',
        '& div': {
            boxSizing: 'border-box'
        },
        '& a': {
            textDecoration: 'none',
            color: 'unset'
        }
    },
});

export default function App() {
    const classes = useStyles();

    const { objects: objectsStore } = useStore();

    React.useEffect(() => {
        objectsStore.init();
    }, []);

    return (
        <div className={classes.appRoot}>
            <AppShell/>
        </div>
    )
}
