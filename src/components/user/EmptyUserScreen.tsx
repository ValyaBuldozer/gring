import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AstronautIcon from "../icons/AstronautIcon";
import { Button } from "@material-ui/core";
import SignInDialog from "./SignInDialog";
import SignOnDialog from "./SignOnDialog";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 'unset',
        width: '70%'
    },
    controls: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: 26,
        textAlign: 'center'
    },
    logIn: {
        width: '100%',
        marginTop: 15
    }
}));

export default function EmptyUserScreen() {
    const [signInOpen, setSignInOpen] = React.useState(false);
    const [signOnOpen, setSignOnOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                Зарегистрируйтесь чтобы пользоваться всеми возможностями!
            </div>
            <AstronautIcon className={classes.logo}/>
            <div className={classes.controls}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSignOnOpen(true)}>
                    Зарегестрироваться
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.logIn}
                    onClick={() => setSignInOpen(true)}>
                    Войти
                </Button>
            </div>
            <SignInDialog open={signInOpen} handleClose={() => setSignInOpen(false)}/>
            <SignOnDialog open={signOnOpen} handleClose={() => setSignOnOpen(false)}/>
        </div>
    )
}
