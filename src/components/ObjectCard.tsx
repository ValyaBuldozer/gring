import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj from '../types/Object';
import { Paper, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const styles: Record<string, React.CSSProperties> = {
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
        textTransform: 'uppercase'
    }
}

const useStyles = createUseStyles<keyof typeof styles>(styles);

interface Props {
    obj: Obj;
    onSelect?: () => void;
}

export default function ObjectCard({ obj, onSelect }: Props) {

    const { name, rating, image } = obj;

    const classes = useStyles();

    return (
        <Paper className={classes.card} elevation={5} style={{ borderRadius: 10 }}>
            <Typography component='div'>
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
            </Typography>
        </Paper>
    )
}
