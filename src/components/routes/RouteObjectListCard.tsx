import * as React from 'react';
import {ObjectBase} from "../../types/Object";
import {Avatar, Box} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 80,
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		borderBottomWidth: 1,
		borderTopWidth: 1,
		display: 'grid',
		gridTemplate: `
			"index avatar info arrow" auto / 20px 60px 1fr 10px
		`,
		padding: '5px 20px'
	},
	index: {
		gridArea: 'index',
		color: theme.palette.text.secondary,
		fontSize: 14
	},
	avatar: {
		gridArea: 'avatar',
		alignSelf: 'center',
		justifySelf: 'center'
	},
	info: {
		gridArea: 'info',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		color: theme.palette.text.primary,
		paddingLeft: 5
	},
	arrow: {
		gridArea: 'arrow',
		alignSelf: 'center',
		justifySelf: 'center'
	},
	name: {
		fontWeight: 'bold',
		fontSize: 14
	}
}));

interface Props {
	obj: ObjectBase;
	index: number;
}

export default function RouteObjectListCard({obj, index}: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.index}>
				{index.toString().padStart(2, '0')}
			</div>
			<Avatar
				src={`/assets/${obj.image}`}
				className={classes.avatar}
				style={{height: 50, width: 50}}/>
			<div className={classes.info}>
				<Box className={classes.name}>{obj.name}</Box>
				<Box>Address</Box>
			</div>
			<div className={classes.arrow}>
				<ChevronRightIcon/>
			</div>
		</div>
	)
}
