import * as React from 'react';
import {createUseStyles} from 'react-jss'
import AppShell from './AppShell';

const useStyles = createUseStyles({
    root: {
        height: '100vh',
        width: '100vw'
    }
});

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppShell/>
        </div>
    )
}
