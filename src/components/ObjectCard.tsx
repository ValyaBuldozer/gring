import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj, {ObjectBase} from '../types/Object';
import { Paper, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import JssStyleSheet from '../util/types/JssStyleSheet';


const styles: JssStyleSheet = theme => ({
    card: {
        width: '100%',
        borderRadius: 5,
        margin: '10px 0'
    },
    logo: {
        width: '100%',
        height: 150,
        objectFit: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    info: {
        padding: 7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'flex-start'
    },
    name: {
        textTransform: 'uppercase',
        color: theme.color.primary
    }
});

const useStyles = createUseStyles(styles);

interface Props {
    obj: ObjectBase;
}

export default function ObjectCard({ obj }: Props) {

    const { name, rating, image } = obj;

    const classes = useStyles();

    return (
        <Paper className={classes.card} elevation={5} style={{ borderRadius: 10 }}>
            <img 
                className={classes.logo} 
                src={'/assets/' + image} 
                {...{loading: 'lazy'}} />
            <div className={classes.info}>
                <Box className={classes.name} fontWeight='fontWeightMedium'>
                    {name}
                </Box>
                <Rating value={rating.average} size='small' readOnly precision={0.5}/>
            </div>
        </Paper>
    )
}
