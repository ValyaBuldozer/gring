import * as React from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss'
import AppShell from './AppShell';
import useStore from '../stores/useStore';
import theme from "../styles/theme";
import {SnackbarProvider} from "notistack";

const useStyles = createUseStyles({
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
	const {objects: objectsStore, routes: routesStore} = useStore();

	React.useEffect(() => {
		objectsStore.init();
		routesStore.init();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.appRoot}>
				<SnackbarProvider maxSnack={3}>
					<AppShell/>
				</SnackbarProvider>
			</div>
		</ThemeProvider>
	)
}
