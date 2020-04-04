import * as React from 'react';
import SortBy from "../util/types/SortBy";
import Button from "@material-ui/core/Button";
import SortIcon from "@material-ui/icons/Sort";
import SelectDialog from "./util/dialogs/SelectDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const useStyles = makeStyles(theme => ({
	root: {
		height: '40px',
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	input: {
		width: '100%',
		height: 30,
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 20,
		color: theme.palette.text.primary,
		padding: '0 10px',
		backgroundColor: theme.palette.background.paper
	}
}));

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
