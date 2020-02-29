import * as React from 'react';
import JssStyleSheet from '../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import Route from '../types/Route';
import { Avatar, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HomeIcon from '@material-ui/icons/Home';
import PlaceIcon from '@material-ui/icons/Place';
import {formatMeters, formatTimeToMinutes} from "../util/formatter";

const styles: JssStyleSheet = {
    cardRoot: {
        height: 100,
        display: 'grid',
        gridTemplate: `
            "avatar name" 1fr
            "avatar rating" 1fr
            "controls controls" 30px / 70px 1fr
        `,
        borderBottom: '1px solid #d4d4d4',
        padding: ' 0 10px',
        '&:first-of-type': {
            borderTop: '1px solid #d4d4d4'
        }
    },
    avatar: {
        gridArea: 'avatar',
        height: 70,
        width: 70,
        alignSelf: 'center',
        justifySelf: 'center'
    },
    name: {
        gridArea: 'name',
        alignSelf: 'flex-end'
    },
    rating: {
        gridArea: 'rating',
        alignSelf: 'center'
    },
    controls: {
        gridArea: 'controls',
        height: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    control: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontSize: 13,
        whiteSpace: 'nowrap'
    }
} 

const useStyles = createUseStyles(styles);

interface Props {
    route: Route;
}

export default function RoutesListCard({ route }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.cardRoot}>
            <Avatar className={classes.avatar} src={'/assets/' + route.image}/>
            <div className={classes.name}>
                {route.name}
            </div>
            <div className={classes.rating}>
                <Rating value={route.rating.average} precision={0.5}/>
            </div>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <QueryBuilderIcon fontSize='small'/>
                    <Box>{route.duration}</Box>
                </div>
                <div className={classes.control}>
                    <PlaceIcon/>
                    <Box>{formatMeters(route.distance)}</Box>
                </div>
                <div className={classes.control}>
                    <HomeIcon/>
                    <Box>{formatTimeToMinutes(route.placesCount)}</Box>
                </div>
            </div>
        </div>
    )
}
