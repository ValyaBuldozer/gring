import * as React from 'react';
import Entity from "../types/Entity";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

interface Props {
    entities: Entity[];
    limit?: number;
}

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '10px',
        minWidth: '70%'
    }
}));

export default function EntitiesList({ entities, limit }: Props) {
    return (
        <React.Fragment>
            {
                entities.slice(0, limit).map((entity) => (
                    <EntityCard entity={entity} key={entity.id}/>
                ))
            }
        </React.Fragment>
    )
}

function EntityCard({ entity }: { entity: Entity }) {
    const classes = useStyles();

    const linkPath = entity.type == 'route' ?
        `/routes/${entity.id}` :
        `/objects/${entity.id}`;

    return (
        <Link to={linkPath}>
            <div className={classes.card}>
                <Avatar className={classes.avatar} src={`/assets/${entity.image}`}/>
                <div className={classes.title}>
                    {entity.name}
                </div>
            </div>
        </Link>
    )
}

interface SkeletonProps {
    length: number;
}

export function SkeletonEntitiesList({ length }: SkeletonProps) {
    const classes = useStyles();

    return (
        <React.Fragment>
            {
                Array(length).fill(
                    <div className={classes.card}>
                        <Skeleton variant='circle' className={classes.avatar}/>
                        <Skeleton variant='text' className={classes.title}/>
                    </div>
                )
            }
        </React.Fragment>
    )
}
