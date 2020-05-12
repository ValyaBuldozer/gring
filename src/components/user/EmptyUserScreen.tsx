import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AstronautIcon from "../icons/AstronautIcon";
import { Button } from "@material-ui/core";
import SignInDialog from "./SignInDialog";
import SignOnDialog from "./SignOnDialog";
import useLocaleString from '../../hooks/useLocaleString';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
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
	},
	settings: {
		position: 'absolute',
		top: 0,
		left: 0
	}
}));

export default function EmptyUserScreen() {
	const [signInOpen, setSignInOpen] = React.useState(false);
	const [signOnOpen, setSignOnOpen] = React.useState(false);
	const classes = useStyles();
	const localeString = useLocaleString();

	return (
		<div className={classes.root}>
			<Link to='/settings'>
				<IconButton
					className={classes.settings}>
					<SettingsIcon/>
				</IconButton>
			</Link>
			<div className={classes.title}>
				{localeString.REGISTER_PLACEHOLDER}
			</div>
			<AstronautIcon className={classes.logo}/>
			<div className={classes.controls}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setSignOnOpen(true)}>
					{localeString.SIGN_ON}
				</Button>
				<Button
					variant="outlined"
					color="primary"
					className={classes.logIn}
					onClick={() => setSignInOpen(true)}>
					{localeString.SIGN_IN}
				</Button>
			</div>
			<SignInDialog open={signInOpen} handleClose={() => setSignInOpen(false)}/>
			<SignOnDialog open={signOnOpen} handleClose={() => setSignOnOpen(false)}/>
		</div>
	)
}

