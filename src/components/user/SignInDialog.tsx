import * as React from 'react';
import useStore from "../../stores/useStore";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const ERROR_DELAY = 3000;

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        margin: '10px 0',
        width: '-webkit-fill-available'
    }
}));

interface Props {
    open: boolean;
    handleClose: () => void;
}

function SignInDialog({open, handleClose}: Props) {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const {user: store} = useStore();
    const classes = useStyles();

    React.useEffect(() => {
        setUsername('');
        setPassword('');
        setIsLoading(false);
        setError(null);
    }, [open]);

    const updateError = (nextError: string) => {
        setError(nextError);

        setTimeout(() => {
            if (nextError == error) {
                setError( null);
            }
        }, ERROR_DELAY);
    };

    const onSignInClick = () => {
        if (isLoading) {
            return;
        }

        if (!username || !password) {
            updateError('Введите имя и пароль');
            return;
        }

        setIsLoading(true);
        store.signIn(username, password)
            .then(err => {
                if (err == null) {
                    handleClose();
                } else {
                    setError(err);
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.title}>
                Вход
            </DialogTitle>
            <DialogContent>
                {
                    isLoading ? (
                        <CircularProgress color={'secondary'}/>
                    ) : (
                        <React.Fragment>
                            <TextField
                                className={classes.input}
                                type='text'
                                label='Имя'
                                variant='outlined'
                                value={username}
                                onChange={e => setUsername(e.target.value)}/>
                            <TextField
                                className={classes.input}
                                type='password'
                                label='Пароль'
                                variant='outlined'
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                            <Typography
                                color='error'
                                style={{ visibility: error == null ? 'hidden' : 'visible' }}>
                                {error}
                            </Typography>
                        </React.Fragment>
                    )
                }
            </DialogContent>
            <DialogActions className={classes.title}>
                <Button variant='text' onClick={onSignInClick}>
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(SignInDialog);
