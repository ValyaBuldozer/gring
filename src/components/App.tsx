import * as React from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    base: {
        color: 'red'
    }
})

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.base}>
            hi
        </div>
    )
}
