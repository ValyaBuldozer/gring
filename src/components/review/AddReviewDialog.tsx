import * as React from 'react';
import useStore from '../../stores/useStore';
import { Dialog } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import useLocaleString from '../../hooks/useLocaleString';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Rating } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import Review from '../../types/Review';

const useStyles = makeStyles(theme => ({
	title: {
		width: '100%',
		paddingTop: 10
	},
	content: {
		width: '80vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

interface Props {
	entityId: number;
	prevReview: Review | null;
	isOpen: boolean;
	onClose: () => void;
}

function AddReviewDialog({ isOpen, onClose, entityId, prevReview }: Props) {
	const classes = useStyles();
	const { api, user: userStore } = useStore();
	const localeString = useLocaleString();
	const { enqueueSnackbar } = useSnackbar();

	const [text, setText] = React.useState(prevReview?.text ?? '');
	const [rating, setRating] = React.useState<number | null>(prevReview?.rating ?? null);
	const [isLoading, setIsLoading] = React.useState(false);

	const onSubmit = async () => {
		if (isLoading) {
			return;
		}

		if (rating == null) {
			enqueueSnackbar(localeString.EMPTY_RATING_ERROR, { variant: 'error' });
			return;
		}

		setIsLoading(true);
		if (prevReview == null) {
			const res = await api.addReview(entityId, rating, text);

			if (res.ok) {
				enqueueSnackbar(localeString.ADD_REVIEW_SUCCESS_MESSAGE, { variant: 'success' });
			} else {
				enqueueSnackbar(localeString.DEFAULT_ERROR_MESSAGE, { variant: 'error' });
			}
		} else {
			const res = await api.updateReview(entityId, rating, text);

			if (res.ok) {
				enqueueSnackbar(localeString.UPDATE_REVIEW_SUCCESS_MESSAGE, { variant: 'success' });
			} else {
				enqueueSnackbar(localeString.DEFAULT_ERROR_MESSAGE, { variant: 'error' });
			}
		}

		userStore.addReview(entityId, text, rating);
		setIsLoading(false);
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>
				{prevReview == null ? localeString.ADD_REVIEW : localeString.UPDATE_REVIEW}
			</DialogTitle>
			<DialogContent className={classes.content}>
				{
					isLoading ? (
						<CircularProgress/>
					) : (
						<>
							<Rating
								value={rating}
								onChange={(e, newValue) => setRating(newValue)}/>
							<TextField
								className={classes.title}
								placeholder={localeString.REVIEW_TEXT_PLACEHOLDER}
								rows={4}
								variant='outlined'
								value={text}
								multiline
								onChange={e => setText(e.target.value)}/>
						</>
					)
				}
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' color='primary' onClick={onClose}>
					{localeString.CANCEL}
				</Button>
				<Button variant='contained' color='primary' onClick={() => onSubmit()}>
					{prevReview == null ? localeString.ADD : localeString.UPDATE}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default observer(AddReviewDialog);
