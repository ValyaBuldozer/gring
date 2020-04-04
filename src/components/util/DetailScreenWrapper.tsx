import * as React from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import { hsl, rgba } from "../../util/color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import useShare from "../../hooks/useShare";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    contentWrapper: {
        height: '100%',
        width: '100%',
        overflowY: 'auto'
    },
    appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 16,
        overflow: 'hidden',
        padding: '0 10px',
        fontWeight: 'bold'
    }
}));

interface Props extends React.PropsWithChildren<{}>, RouteComponentProps {
    title: string;
    shareEnabled?: boolean;
    showAlways?: boolean;
    className?: string;
}

function DetailScreenWrapper(props: Props) {
    const {
        children,
        history,
        title = '',
        shareEnabled = true,
        showAlways = false,
        className = ''
    } = props;

    const classes = useStyles();
    const wrapper = React.useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = React.useState(showAlways ? 1 : 0);
    const share = useShare();
    const theme = useTheme();

    const wrapperOnScroll = () => {
        const scrollTop = wrapper.current?.scrollTop ?? 0,
            nextState = scrollTop < 100 ?
                (scrollTop % 100) / 100 :
                1;

        if (nextState != scrollState) {
            setScrollState(nextState);
        }
    };

    const onGoBackClick = () => {
        history.goBack();
    };

    const onShareClick = () => {
        share(title);
    };

    const titleColor = theme.palette.type == 'light' ?
        hsl(0, 0, (1 - scrollState) * 100) :
        rgba(255, 255, 255, 1),
        backgroundColor = theme.palette.type == 'light' ?
            rgba(255, 255, 255, scrollState) :
            rgba(66, 66, 66, scrollState);

    return (
        <div className={`${classes.root} ${className}`}>
            <div className={classes.appBar} style={{ backgroundColor }}>
                <IconButton onClick={onGoBackClick}>
                    <ArrowBackIcon style={{ color: titleColor }}/>
                </IconButton>
                <div
                    className={classes.title}
                    style={{
                        color: titleColor,
                        visibility: scrollState > 0.5 ? 'visible' : 'hidden'
                    }}>
                    {title}
                </div>
                <IconButton
                    onClick={onShareClick}
                    style={{
                        visibility: shareEnabled ? 'visible' : 'hidden'
                    }}>
                    <ShareIcon style={{ color: titleColor }}/>
                </IconButton>
            </div>
            <div
                ref={wrapper}
                className={classes.contentWrapper}
                onScroll={!showAlways ? wrapperOnScroll : undefined}
                style={{
                    paddingTop: showAlways ? 50 : undefined
                }}>
                {children}
            </div>
        </div>
    )
}

export default withRouter(DetailScreenWrapper);
