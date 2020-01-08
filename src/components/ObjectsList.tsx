import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj from '../types/Object';
import ObjectCard from './ObjectCard';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = {
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

const useStyles = createUseStyles<keyof typeof styles>(styles);

export default function ObjectsList() {
    const [objects, setObjects] = React.useState<Obj[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    
    const classes = useStyles({ isLoading });

    React.useEffect(() => {
        fetch('/api/objects')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Can\'t fetch objects list');
                }
            })
            .then((objects: Obj[]) => {
                setObjects(objects);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className={classes.list}>
            {
                isLoading ? (
                    Array(8).fill(
                        <Skeleton variant='rect' className={classes.skeleton} height={200}/>
                    )
                ) : objects.map(obj => (
                    <Link to={`/objects/${obj.id}`}>
                        <ObjectCard key={obj.id} obj={obj} />
                    </Link>
                ))
            }
        </div>
    )
}
