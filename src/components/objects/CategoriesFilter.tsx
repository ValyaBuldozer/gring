import * as React from 'react';
import useStore from '../../stores/useStore';
import {observer} from 'mobx-react-lite';
import {Box} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    categoryList: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    category: {
        padding: '0 8px',
        fontSize: 14,
        paddingTop: 5,
        fontWeight: 'bold',
        position: 'relative',
        color: theme.palette.text.primary,

        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            right: '50%',
            borderBottom: `2px solid ${theme.palette.text.primary}`,
            transition: 'left 0.3s ease, right 0.3s ease'
        }
    },
    selectedCategory: {
        '&:after': {
            left: 4,
            right: 4,
        }
    }
}));

const CategoriesFilter = observer(() => {
    const { objects: store } = useStore();
    const classes = useStyles();
    

    return (
        <div className={classes.categoryList}>
            <Box 
                className={`${classes.category} ${store.selectedCategory == null ? classes.selectedCategory : null}`}
                onClick={() => store.selectCategory(null)}>
                Все
            </Box>
            {
                (store.categories ?? []).map(category => (
                    <Box 
                        className={`${classes.category} ${store.selectedCategory == category ? classes.selectedCategory : null}`} 
                        key={category.id}
                        onClick={() => store.selectCategory(category)}>
                        {category.name}
                    </Box>
                ))
            }
        </div>
    )
});

export default CategoriesFilter;
