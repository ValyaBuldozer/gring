import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj from '../../types/Object';
import {RouterProps, useParams, withRouter} from 'react-router';
import { Typography, Box, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import JssStyleSheet from '../../util/types/JssStyleSheet';
import ObjectRoutesList from './ObjectRoutesList';
import ReviewList from '../ReviewList';
import {observer} from "mobx-react-lite";
import useStore from "../../stores/useStore";

interface State {
    showDescription: boolean;
}

const styles: JssStyleSheet<State> = theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'block',
        overflowY: 'auto'
    },
    logo: {
        height: theme.dimensions.detail.logoHeight,
        width: '100%',
        objectFit: 'cover'
    },
    name: {
        textTransform: 'uppercase',
        fontSize: theme.dimensions.detail.titleFontSize,
        fontWeight: "bolder",
        textAlign: 'center'
    },
    rating: {
        padding: 5,
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    description: {
        width: '100%',
        padding: '0 13px',
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
        boxShadow: ({ showDescription }) => showDescription ? 'unset' : 'inset 0 -8px 9px -6px grey',
        maxHeight: ({ showDescription }) => showDescription ? 'unset' : 200,
        overflowY: ({ showDescription }) => showDescription ? 'unset' : 'hidden'
    },
    title: {
        textAlign: 'left',
        width: '100%',
        textTransform: 'uppercase',
        fontSize: 23,
        padding: '5px 15px'
    },
    routes: {
        width: '100%'
    }
});

const useStyles = createUseStyles(styles);

interface Props extends RouterProps {}


function ObjectDetailScreen({history}: Props) {

    const { id } = useParams();
    const { objects: store } = useStore();

    const [object, setObject] = React.useState<Obj | null>(null);
    const [showDescription, setShowDescription] = React.useState(false);

    const classes = useStyles({ showDescription } as State);

    React.useEffect(() => {
        store.fetchDetailEntity(parseInt(id ?? ''))
            .then(obj => {
                if (obj != null) {
                    setObject(obj);
                } else {
                    history.push('/404');
                }
            })
    }, []);

    return (
        <Typography className={classes.root} component='div'>
            {
                object == null ?
                    'loading' : (
                        <>
                            <img src={`/assets/${object.image}`} className={classes.logo} />
                            <Box className={classes.name}>
                                {object.name}
                            </Box>
                            <div className={classes.rating}>
                                <Rating value={object.rating.average} size='large' />
                                <Box>({object.rating.count})</Box>
                            </div>
                            <Box className={classes.description}>
                                {object.description}
                            </Box>
                            {
                                !showDescription ? (
                                    <Box
                                        fontWeight="bolder"
                                        textAlign='center'
                                        onClick={() => setShowDescription(!showDescription)}>
                                        Показать полностью
                                    </Box>
                                ) : null
                            }
                            <Box className={classes.title} fontWeight='bolder'>
                                МАРШРУТЫ
                            </Box>
                            <div className={classes.routes}>
                                <ObjectRoutesList objectId={object.id} />
                            </div>
                            <Box className={classes.title} fontWeight='bolder'>
                                ОТЗЫВЫ
                            </Box>
                            <ReviewList objectId={object.id} limit={2}/>
                        </>
                    )
            }
        </Typography>
    )
}

export default withRouter(observer(ObjectDetailScreen));
