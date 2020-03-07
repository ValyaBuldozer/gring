import * as React from 'react';
import {ThemedStyleSheet} from '../../util/types/JssStyleSheet';
import {createUseStyles} from 'react-jss';
import {Avatar, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Review from '../../types/Review';
import SkeletonBaseProps from "../../util/types/SkeletonBaseProps";
import {Skeleton} from "@material-ui/lab";

const styles: ThemedStyleSheet = theme => ({
	root: {
		width: '100%',
		minHeight: 50,
		padding: 5,
		display: 'grid',
		gridTemplate: `
            "avatar name" 50px
            "info info" 20px
            "text text" auto / 55px 1fr
        `
	},
	avatar: {
		gridArea: 'avatar',
		alignSelf: 'center',
		justifySelf: 'center'
	},
	title: {
		gridArea: 'name',
		alignSelf: 'center',
		justifySelf: 'flex-start',
		paddingLeft: 5,
		fontSize: theme.dimensions.detail.secondaryTitleFontSize
	},
	text: {
		gridArea: 'text',
		padding: 5,
		fontSize: 13,
		maxHeight: 64,
		overflowY: 'hidden'
	},
	info: {
		gridArea: 'info',
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	rating: {
		marginLeft: 7
	},
	date: {
		color: theme.color.secondary,
		fontSize: 13,
		padding: '1px 0 0 10px'
	},

} as const);

const useStyles = createUseStyles(styles);

interface Props {
	review: Review;
	className?: string;
}

export default function ReviewCard({review, className = ''}: Props) {

	const classes: Record<keyof ReturnType<typeof styles>, string> = useStyles();

	return (
		<div className={`${classes.root} ${className}`}>
			<Avatar className={classes.avatar}/>
			<Box className={classes.title}>
				{review.user.name}
			</Box>
			<div className={classes.info}>
				<Rating
					className={classes.rating}
					value={review.rating}
					readOnly
					size="small"/>
				<Box className={classes.date}>
					{review.time}
				</Box>
			</div>
			<Box className={classes.text}>
				{review.text}
			</Box>
		</div>
	)
}

export function ReviewCardSkeleton({className}: SkeletonBaseProps) {
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className}`}>
			<Skeleton variant='circle' className={classes.avatar} height={40} width={40}/>
			<Skeleton variant='text' className={classes.title} width={70}/>
			<div className={classes.info}>
				<Skeleton variant='text' className={classes.rating} width={180}/>
			</div>
			<Skeleton
				variant='rect'
				className={classes.text}
				height={50}
				style={{margin: 10}}/>
		</div>
	)
}
