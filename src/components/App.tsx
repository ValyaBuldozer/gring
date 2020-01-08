import * as React from 'react';
import {createUseStyles} from 'react-jss'
import AppShell from './AppShell';

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

    return (
        <div className={classes.appRoot}>
            <AppShell/>
        </div>
    )
}
