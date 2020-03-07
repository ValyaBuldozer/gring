import * as React from 'react';
import {createUseStyles} from 'react-jss';
import JssStyleSheet from "../util/types/JssStyleSheet";
import {RouteComponentProps, withRouter} from "react-router";
import {hsl, rgba} from "../util/color";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from "@material-ui/core/IconButton";
import {useSnackbar} from "notistack";
import {Navigator} from "../types/Navigator";
import copyToClipboard from "../util/copyToClipboard";

const styles: JssStyleSheet = theme => ({
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
		fontSize: theme.dimensions.detail.secondaryTitleFontSize,
		overflow: 'hidden',
		padding: '0 10px',
		fontWeight: 'bold'
	}
});

const useStyle = createUseStyles(styles);

interface Props extends React.PropsWithChildren<{}>, RouteComponentProps {
	title: string;
	shareEnabled?: boolean;
	showAlways?: boolean;
}

function DetailScreenWrapper(props: Props) {
	const {
		children,
		history,
		title = '',
		shareEnabled = true,
		showAlways = false
	} = props;

	const classes = useStyle();
	const wrapper = React.useRef<HTMLDivElement>(null);
	const [scrollState, setScrollState] = React.useState(showAlways ? 1 : 0);
	const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
		if ((window.navigator as Navigator).canShare) {
			(window.navigator as Navigator).share({
				title: 'GRing',
				text: `${title}: `,
				url: window.location.href
			}).catch(e => {
				console.error(e);
			});
		} else {
			copyToClipboard(window.location.href);
			const key = enqueueSnackbar('Скопировано в буфер обмена');

			setTimeout(() => {
				closeSnackbar(key);
			}, 3000);
		}
	};

	const titleColor = hsl(0, 0, (1 - scrollState) * 100),
		backgroundColor = rgba(255, 255, 255, scrollState);

	return (
		<div className={classes.root}>
			<div className={classes.appBar} style={{backgroundColor}}>
				<IconButton onClick={onGoBackClick}>
					<ArrowBackIcon style={{color: titleColor}}/>
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
						visibility: shareEnabled ? 'visible': 'hidden'
					}}>
					<ShareIcon style={{color: titleColor}}/>
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
