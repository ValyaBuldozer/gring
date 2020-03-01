import * as React from 'react';
import SortBy from "../util/types/SortBy";
import JssStyleSheet from "../util/types/JssStyleSheet";
import {createUseStyles} from 'react-jss';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SortIcon from "@material-ui/icons/Sort";
import SelectDialog from "./SelectDialog";

const SORT_LABELS: {[K in keyof typeof SortBy]: string} = {
	[SortBy.DEFAULT]: 'По умолчанию',
	[SortBy.NAME]: 'По имени',
	[SortBy.TIME]: 'По времени в пути',
	[SortBy.DISTANCE]: 'По расстоянию',
	[SortBy.RATING_COUNT]: 'По количеству отзывов',
	[SortBy.RATING_AVG]: 'По средней оценке',
	[SortBy.OBJECTS_COUNT]: 'По количеству объектов',
	[SortBy.ROUTE_DISTANCE]: 'По протяженности'
} as const;

const styles: JssStyleSheet = theme => ({
	root: {
		height: '40px',
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	input: {
		width: '100%',
		height: 30,
		border: `1px solid ${theme.color.secondary}`,
		borderRadius: 20,
		color: theme.color.primary,
		padding: '0 10px'
	}
});

const useStyles = createUseStyles(styles);

interface Props {
	className?: string;
	sortBy: SortBy;
	sortByOptions?: SortBy[];
	searchString: string;
	onSearchStringChange: (searchString: string) => void;
	onSortByChange: (sortBy: SortBy) => void;
}

export default function SearchBar(props: Props) {
	const {
		sortBy,
		searchString,
		onSearchStringChange,
		onSortByChange,
		className = '',
		sortByOptions = Object.keys(SORT_LABELS) as SortBy[]
	} = props;

	const [sortIsOpen, setSortOpen] = React.useState(false);

	const classes = useStyles();

	const sortDialogOnClose = (variant: SortBy) => {
		onSortByChange(variant);
		setSortOpen(false);
	};

	return (
		<div className={`${classes.root} ${className}`}>
			<input
				className={classes.input}
				type="search"
				placeholder="Поиск..."
				value={searchString ?? ''}
				onChange={({target}) => onSearchStringChange(target.value)}/>
			<Button style={{minWidth: 0}}
					className={`${classes.sort} ${classes.btn}`}
					onClick={() => setSortOpen(true)}>
				<SortIcon/>
			</Button>
			<SelectDialog
				variants={sortByOptions.map((opt: SortBy) => [opt, SORT_LABELS[opt]])}
				selectedVariant={sortBy}
				title={'Сортировка'}
				open={sortIsOpen}
				onClose={sortDialogOnClose}/>
		</div>
	)
}
