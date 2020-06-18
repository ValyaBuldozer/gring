import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Dialog } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import useStore from "../../stores/useStore";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
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
        minHeight: 266,
        minWidth: '80vw',
        display: 'grid'
    },
    input: {
        margin: '10px 0',
        width: '-webkit-fill-available'
    },
    spinner: {
        justifySelf: 'center',
        alignSelf: 'center'
    }
}));

interface Props {
    open: boolean;
    handleClose: () => void;
}

function SignOnDialog({ open, handleClose }: Props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
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
        setEmail('');
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

    const onSignOnClick = async () => {
        if (!isOnline) {
            enqueueSnackbar(localeString.OFFLINE_ERROR, { variant: 'error' });
            return;
        }

        if (isLoading) {
            return;
        }

        if (!username || !password || !email) {
            updateError('Заполните все поля');
            return;
        }

        setIsLoading(true);
        const err = await store.signOn(username, password, email);

        if (err == null) {
            handleClose();
        } else {
            setError(err);
        }

        setIsLoading(false);
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title" className={classes.title}>
                {localeString.SIGN_ON}
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
                                type='email'
                                label={localeString.EMAIl}
                                variant='outlined'
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
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
                <Button variant="contained" onClick={onSignOnClick} color="primary">
                    {localeString.SIGN_ON}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default observer(SignOnDialog);
