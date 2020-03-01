import * as React from 'react';
import JssStyleSheet from '../../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import { RouteBase } from '../../types/Route';
import { Home } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const styles: JssStyleSheet = {
    root: {
        width: '100%',
        position: 'relative',
        minHeight: 60,
        maxHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: 5
    },
    name: {
        padding: '0 20px',
        // TODO: move into theme
        fontSize: 18
    }
}

const useStyles = createUseStyles(styles);

interface Props {
    route: RouteBase;
}

export default function RouteCard({ route }: Props) {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.name}>{ route.name }</Box>
            <Rating readOnly value={3} size="medium"/>
        </div>
    )
}
