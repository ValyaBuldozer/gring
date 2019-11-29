import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Obj from '../types/Object';
import ObjectCard from './ObjectCard';

const styles: Record<string, React.CSSProperties> = {
    list: {
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        padding: '0 7px'
    }
}

const useStyles = createUseStyles<keyof typeof styles>(styles);

export default function ObjectsScreen() {
    const classes = useStyles();

    const [objects, setObjects] = React.useState<Obj[]>([]);

    React.useEffect(() => {
        fetch('/api/objects')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Can\t fetch objects list');
                }
            })
            .then((objects: Obj[]) => {
                setObjects(objects);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className={classes.list}>
            {
                objects.map(obj => (
                    <ObjectCard key={obj.id} obj={obj} onSelect={() => {}}/>
                ))
            }
        </div>
    )
}
