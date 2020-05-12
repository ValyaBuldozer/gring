import * as React from 'react';
import SortBy from "../util/types/SortBy";
import Button from "@material-ui/core/Button";
import SortIcon from "@material-ui/icons/Sort";
import SelectDialog from "./util/dialogs/SelectDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocaleString, { useCurrentLocale } from '../hooks/useLocaleString';
import Locale from '../util/types/Locale';

type Labels = {[K in keyof typeof SortBy]: string};

const RU_SORT_LABELS: Labels = {
	[SortBy.DEFAULT]: 'По умолчанию',
	[SortBy.NAME]: 'По имени',
	[SortBy.TIME]: 'По времени в пути',
	[SortBy.DISTANCE]: 'По расстоянию',
	[SortBy.RATING_COUNT]: 'По количеству отзывов',
	[SortBy.RATING_AVG]: 'По средней оценке',
	[SortBy.OBJECTS_COUNT]: 'По количеству объектов',
	[SortBy.ROUTE_DISTANCE]: 'По протяженности'
} as const;

const EN_SORT_LABELS: Labels = {
	[SortBy.DEFAULT]: 'By default',
	[SortBy.NAME]: 'By name',
	[SortBy.TIME]: 'By time',
	[SortBy.DISTANCE]: 'By distance',
	[SortBy.RATING_COUNT]: 'By rating count',
	[SortBy.RATING_AVG]: 'By average rating',
	[SortBy.OBJECTS_COUNT]: 'By objects count',
	[SortBy.ROUTE_DISTANCE]: 'By route distance'
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
		sortByOptions = Object.keys(RU_SORT_LABELS) as SortBy[]
	} = props;

	const [sortIsOpen, setSortOpen] = React.useState(false);
	const currentLocale = useCurrentLocale();
	const localeString = useLocaleString();
	const classes = useStyles();

	const labels = currentLocale == Locale.EN ? EN_SORT_LABELS : RU_SORT_LABELS;

	const sortDialogOnClose = (variant: SortBy) => {
		onSortByChange(variant);
		setSortOpen(false);
	};

	return (
		<div className={`${classes.root} ${className}`}>
			<input
				className={classes.input}
				type="search"
				placeholder={`${localeString.SEARCH}...`}
				value={searchString ?? ''}
				onChange={({target}) => onSearchStringChange(target.value)}/>
			<Button style={{minWidth: 0}}
				onClick={() => setSortOpen(true)}>
				<SortIcon/>
			</Button>
			<SelectDialog
				variants={sortByOptions.map((opt: SortBy) => [opt, labels[opt]])}
				selectedVariant={sortBy}
				title={localeString.SORT}
				open={sortIsOpen}
				onClose={sortDialogOnClose}/>
		</div>
	)
}
