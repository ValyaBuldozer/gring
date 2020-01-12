import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj from '../types/Object';
import ObjectCard from './ObjectCard';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import useStore from '../stores/useStore';
import { observer } from 'mobx-react-lite';
import JssStyleSheet from '../util/types/JssStyleSheet';

const styles: JssStyleSheet = {
    list: {
        height: '100%',
        width: '100%',
        padding: '0 7px',
        overflowY: ({isLoading}: any) => isLoading ? 'hidden' : 'auto'
    },
    skeleton: {
        margin: '15px 0',
        borderRadius: 10
    }
}

const useStyles = createUseStyles(styles);

const ObjectsList = observer(() => {   
    const { objects: store } = useStore();
    const classes = useStyles({ isLoading: store.isLoading });

    return (
        <div className={classes.list}>
            {
                store.isLoading ? (
                    Array(8).fill(
                        <Skeleton variant='rect' className={classes.skeleton} height={200}/>
                    )
                ) : store.objectsList.map(obj => (
                    <Link to={`/objects/${obj.id}`}>
                        <ObjectCard key={obj.id} obj={obj} />
                    </Link>
                ))
            }
        </div>
    )
});

export default ObjectsList;
