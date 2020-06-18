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
import useLocaleString from '../../hooks/useLocaleString';
import SplashScreen from '../SplashScreen';
import useNetwork from '../../hooks/useNetwork';
import { useSnackbar } from 'notistack';

const ERROR_DELAY = 3000;

const useStyles = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'center'
    },
    fields: {
        minHeight: 192,
        minWidth: '80vw',
        display: 'grid'
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

function SignInDialog({ open, handleClose }: Props) {
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { user: store } = useStore();
    const isOnline = useNetwork();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const localeString = useLocaleString();

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
                setError(null);
            }
        }, ERROR_DELAY);
    };

    const onSignInClick = async () => {
        if (!isOnline) {
            enqueueSnackbar(localeString.OFFLINE_ERROR, { variant: 'error' });
            return;
        }

        if (isLoading) {
            return;
        }

        if (!username || !password) {
            updateError('Введите имя и пароль');
            return;
        }

        setIsLoading(true);
        const err = await store.signIn(username, password);

        if (err == null) {
            handleClose();
        } else {
            setError(err);
        }

        setIsLoading(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.title}>
                {localeString.SIGN_IN}
            </DialogTitle>
            <DialogContent className={classes.fields}>
                {
                    isLoading ? (
                        <SplashScreen/>
                    ) : (
                        <React.Fragment>
                            <TextField
                                className={classes.input}
                                type='text'
                                label={localeString.NAME}
                                variant='outlined'
                                value={username}
                                onChange={e => setUsername(e.target.value)}/>
                            <TextField
                                className={classes.input}
                                type='password'
                                label={localeString.PASSWORD}
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
                <Button variant="outlined" onClick={onSignInClick} color="primary">
                    {localeString.SIGN_IN}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(SignInDialog);
