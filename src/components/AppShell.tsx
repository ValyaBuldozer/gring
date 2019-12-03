import * as React from 'react';
import { createUseStyles } from 'react-jss'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';
import ExploreIcon from '@material-ui/icons/Explore';
import { Button, Paper } from '@material-ui/core';

const ObjectsList = React.lazy(() => import('./ObjectsList'));
const RoutesScreen = React.lazy(() => import('./RoutesScreen'));
const ObjectScreen = React.lazy(() => import('./ObjectScreen'));

const styles: Record<string, any> = {
    root: {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplate: 'calc(100% - 50px) 50px / 100%',
        gridTemplateAreas: '"panel" "navbar"',
        '& div': {
            boxSizing: 'border-box'
        },
        '& a': {
            textDecoration: 'none',
            color: 'unset'
        }
    },
    panel: {
        gridArea: 'panel',
        height: '100%',
        width: '100%'
    },
    navbar: {
        gridArea: 'navbar',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}

const useStyles = createUseStyles(styles);

export default function AppShell() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <div className={classes.panel}>
                    <React.Suspense fallback={'Loading'}>
                        <Switch>
                            <Route exact path='/routes' component={RoutesScreen}/>
                            <Route exact path="/objects" component={ObjectsList}/>
                            <Route exact path="/objects/:id" component={ObjectScreen}/>
                            <Route path="/" component={ObjectsList}/>
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
            </div>
        </Router>
    )
}
