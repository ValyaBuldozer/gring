import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStore from "../../stores/useStore";
import { observer } from "mobx-react-lite";
import Button from '@material-ui/core/Button';
import SignInDialog from "./SignInDialog";
import { Switch } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
}));

function UserScreen() {
    const { user: userStore, settings: settingsStore } = useStore();
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button onClick={() => setOpen(true)}>
                log in
            </Button>
            <Switch
                checked={settingsStore.theme == 'dark'}
                onChange={() => settingsStore.switchTheme()}/>
            <SignInDialog open={open} handleClose={() => setOpen(false)}/>
        </div>
    )
}

export default observer(UserScreen);
