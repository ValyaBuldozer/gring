import * as React from 'react';
import { createUseStyles } from 'react-jss'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import ExploreIcon from '@material-ui/icons/Explore';
import { Button, Paper, Typography } from '@material-ui/core';
import JssStyleSheet from '../util/types/JssStyleSheet';

const ObjectsScreen = React.lazy(() => import('./ObjectsScreen'));
const RoutesScreen = React.lazy(() => import('./RoutesScreen'));
const ObjectDetailScreen = React.lazy(() => import('./ObjectDetailScreen'));

const styles: JssStyleSheet = {
    appShell: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    panel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50
    },
    navbar: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}

const useStyles = createUseStyles(styles);

export default function AppShell() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.appShell}>
                <Typography component='div'>
                    <div className={classes.panel}>
                        <React.Suspense fallback={'Loading'}>
                            <Switch>
                                <Route exact path='/routes' component={RoutesScreen} />
                                <Route exact path="/objects" component={ObjectsScreen} />
                                <Route exact path="/objects/:id" component={ObjectDetailScreen} />
                                <Route exact path="/404" render={() => '404'}/>
                                <Route path="/" component={ObjectsScreen} />
                            </Switch>
                        </React.Suspense>
                    </div>
                    <Paper className={classes.navbar} elevation={5}>
                        <Link to='/'>
                            <Button>
                                <PlaceIcon />
                            </Button>
                        </Link>
                        <Link to='/routes'>
                            <Button>
                                <ExploreIcon />
                            </Button>
                        </Link>
                    </Paper>
                </Typography    >
            </div>
        </Router>
    )
}
