import * as React from 'react';
import JssStyleSheet from '../util/types/JssStylesheet';
import { createUseStyles } from 'react-jss';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Review from '../types/Review';

const styles: JssStyleSheet = {
    root: {
        width: '100%',
        minHeight: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: 5
    },
    title: {
        display: 'flex',
        minHeight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        // TODO: move into theme
        fontSize: 18
    },
    text: {
        padding: 5,
        fontSize: 13, 
        maxHeight: 64,
        overflowY: 'hidden'
    }
}

const useStyles = createUseStyles(styles);

interface Props {
    review: Review;
}

export default function ReviewCard({ review }: Props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Box>{ review.user.name }</Box>
                <Rating value={review.rating} readOnly size="small"/>
            </div>
            <Box className={classes.text}>{review.text}</Box>
        </div>
    )
}

