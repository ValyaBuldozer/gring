import * as React from 'react';
import ObjectCard from './ObjectCard';
import {Link} from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import useStore from '../../stores/useStore';
import {observer} from 'mobx-react-lite';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../styles/theme";

const useStyles = makeStyles<typeof theme, {isLoading: boolean}>({
    list: {
        height: 'calc(100% - 70px)',
        padding: '0 7px',
        overflowY: ({isLoading}: any) => isLoading ? 'hidden' : 'auto'
    },
    skeleton: {
        margin: '15px 0',
        borderRadius: 10
    }
});

function ObjectsList() {   
    const { objects: store } = useStore();
    const classes = useStyles({ isLoading: store.isLoading });

    return (
        <div className={classes.list}>
            {
                store.isLoading ? (
                    Array(8).fill(
                        <Skeleton variant='rect' className={classes.skeleton} height={200}/>
                    )
                ) : store.list.map(obj => (
                    <Link to={`/objects/${obj.id}`}>
                        <ObjectCard key={obj.id} obj={obj} />
                    </Link>
                ))
            }
        </div>
    )
}

export default observer(ObjectsList);
