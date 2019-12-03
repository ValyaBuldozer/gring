import * as React from 'react';
import JssStyleSheet from '../util/types/JssStylesheet';
import { createUseStyles } from 'react-jss';
import { RouteBase } from '../types/Route';
import { Home } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const styles: JssStyleSheet = {
    root: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: 5
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
            <Box>{ route.name }</Box>
            <Rating readOnly value={0} size="medium"></Rating>
        </div>
    )
}
