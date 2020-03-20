import * as React from 'react';
import AppShell from './AppShell';
import useStore from '../stores/useStore';
import theme from "../styles/theme";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from '@material-ui/core/styles';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CssBaseline} from "@material-ui/core";

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
	const {objects: objectsStore, routes: routesStore} = useStore();

	React.useEffect(() => {
		objectsStore.init();
		routesStore.init();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<div className={classes.appRoot}>
				<SnackbarProvider maxSnack={3}>
					<AppShell/>
				</SnackbarProvider>
			</div>
		</ThemeProvider>
	)
}
