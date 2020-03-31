import * as React from 'react';
import AppShell from './AppShell';
import useStore from '../stores/useStore';
import { SnackbarProvider } from "notistack";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ThemeWrapper from "./ThemeWrapper";

const useStyles = makeStyles({
	appRoot: {
		height: '100vh',
		width: '100vw',
		boxSizing: 'border-box',
		'& div': {
			boxSizing: 'border-box'
		},
		'& a': {
			textDecoration: 'none',
			color: 'unset'
		}
	},
});

export default function App() {
	const classes = useStyles();
	const {objects: objectsStore, routes: routesStore, user: userStore} = useStore();

	React.useEffect(() => {
		objectsStore.init();
		routesStore.init();
		userStore.init();
	}, []);

	return (
		<ThemeWrapper>
			<div className={classes.appRoot}>
				<SnackbarProvider maxSnack={3}>
					<AppShell/>
				</SnackbarProvider>
			</div>
		</ThemeWrapper>
	)
}
