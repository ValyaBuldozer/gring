import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStore from "../../stores/useStore";
import { observer } from "mobx-react-lite";
import Button from '@material-ui/core/Button';
import SignInDialog from "./SignInDialog";
import EmptyUserScreen from "./EmptyUserScreen";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        position: 'relative'
    },
    header: {

    }
}));

function UserScreen() {
    const { user: userStore, settings: settingsStore } = useStore();
    const classes = useStyles();

    if (!userStore.isAuthorized) {
        return <EmptyUserScreen/>;
    }

    return (
        <div className={classes.root}>
            {userStore.user?.name}
        </div>
    )
}

export default observer(UserScreen);
