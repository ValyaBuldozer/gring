import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useStore from "../../stores/useStore";
import { observer } from "mobx-react-lite";
import EmptyUserScreen from "./EmptyUserScreen";
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from "@material-ui/core";
import cn from "../../util/classnames";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationDialog from "../util/dialogs/ConfirmationDialog";
import EntitiesList, { SkeletonEntitiesList } from "../EntitiesList";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useLocaleString from '../../hooks/useLocaleString';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		width: '100%',
		overflowY: 'scroll',
		overflowX: 'hidden',
		position: 'relative'
	},
	header: {
		minHeight: 200,
		display: 'grid',
		gridTemplate: `
            "settings _ avatar edit logout" 150px
            "name name name name name" auto / 40px 40px 1fr 40px 40px
        `
	},
	settings: {
		gridArea: 'settings'
	},
	edit: {
		gridArea: 'edit'
	},
	logout: {
		gridArea: 'logout'
	},
	icon: {
		alignSelf: 'flex-start',
		justifySelf: 'center',
		color: theme.palette.text.primary
	},
	avatar: {
		gridArea: 'avatar',
		height: 110,
		width: 110,
		justifySelf: 'center',
		alignSelf: 'center'
	},
	name: {
		gridArea: 'name',
		justifySelf: 'center',
		color: theme.palette.text.primary,
		fontSize: 26,
		fontWeight: 'bold'
	},
	section: {
		padding: '10px 20px'
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.palette.text.primary
	},
	favoritesListButton: {
		color: theme.palette.primary.main
	},
	spinnerWrapper: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	menuItem: {
		minHeight: 50,
		display: 'flex',
		alignItems: 'center',
		padding: '0 10px 0 20px'
	},
	menuItemTitle: {
		width: '100%'
	}
}));

function UserScreen() {
	const { user: userStore, settings: settingsStore } = useStore();
	const [signOutConfirmOpen, setSignOutConfirmOpen] = React.useState(false);
	const classes = useStyles();
	const localeString = useLocaleString();

	if (!userStore.isInitialized) {
		// TODO: implement with skeleton screen
		return (
			<div className={classes.spinnerWrapper}>
				<CircularProgress/>
			</div>
		)
	}

	if (!userStore.isAuthorized) {
		return <EmptyUserScreen/>;
	}

	const onSignOutClose = (confirmed: boolean) => {
		if (confirmed) {
			userStore.signOut();
		}

		setSignOutConfirmOpen(false);
	};

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Link to='/settings'>
					<IconButton
						className={cn(classes.settings, classes.icon)}>
						<SettingsIcon/>
					</IconButton>
				</Link>
				<Avatar src={`/assets/${userStore.user?.image}`} className={classes.avatar}/>
				<IconButton className={cn(classes.edit, classes.icon)}>
					<EditIcon/>
				</IconButton>
				<IconButton
					className={cn(classes.logout, classes.icon)}
					onClick={() => setSignOutConfirmOpen(true)}>
					<ExitToAppIcon/>
				</IconButton>
				<div className={classes.name}>
					{userStore.user?.name}
				</div>
			</div>
			<Divider/>
			<div className={cn(classes.sectionTitle, classes.section)}>
				{localeString.FAVORITES}
			</div>
			<div className={cn(classes.section)}>
				{
					userStore.favorites ? (
						<EntitiesList entities={userStore.favorites} limit={2}/>
					) : (
						<SkeletonEntitiesList length={2}/>
					)
				}
			</div>
			<Link to='/favorites'>
				<div className={cn(classes.sectionTitle, classes.section, classes.favoritesListButton)}>
					{localeString.SHOW_ALL}
				</div>
			</Link>
			<Divider/>
			<Link to='/user/reviews'>
				<div className={cn(classes.menuItem, classes.section)}>
					<div className={cn(classes.menuItemTitle, classes.sectionTitle)}>
						{localeString.MY_REVIEWS}
					</div>
					<ChevronRightIcon/>
				</div>
			</Link>
			<Divider/>
			<div className={cn(classes.menuItem, classes.section)}>
				<div className={cn(classes.menuItemTitle, classes.sectionTitle)}>
					{localeString.VISITED_PLACES}
				</div>
				<ChevronRightIcon/>
			</div>
			<Divider/>


			<ConfirmationDialog
				open={signOutConfirmOpen}
				title={localeString.CONFIRM_EXIT}
				onClose={onSignOutClose}/>
		</div>
	)
}

export default observer(UserScreen);
