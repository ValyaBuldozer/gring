import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from "react-router";
import DetailScreenWrapper from "../util/DetailScreenWrapper";
import useStore from "../../stores/useStore";
import EntitiesList, { SkeletonEntitiesList } from "../EntitiesList";
import { observer } from "mobx-react-lite";
import useLocaleString from '../../hooks/useLocaleString';

const useStyles = makeStyles(theme => ({
    list: {
        padding: '0 20px'
    }
}));

function FavoritesDetailScreen() {
    const history = useHistory();
    const classes = useStyles();
    const {user: store} = useStore();
    const localeString = useLocaleString();

    React.useEffect(() => {
        if (store.isInitialized && !store.isAuthorized) {
            history.push('/user');
        }
    }, [store.isInitialized]);

    return (
        <DetailScreenWrapper
            className={classes.list}
            title={localeString.FAVORITES}
            shareEnabled={false}
            showAlways>
            {
                store.favorites ? (
                    <EntitiesList entities={store.favorites}/>
                ) : (
                    <SkeletonEntitiesList length={8}/>
                )
            }
        </DetailScreenWrapper>
    )
}

export default observer(FavoritesDetailScreen);

