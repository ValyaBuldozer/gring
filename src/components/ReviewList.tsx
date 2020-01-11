import * as React from 'react';
import JssStyleSheet from '../util/types/JssStyleSheet';
import { createUseStyles } from 'react-jss';
import Review from '../types/Review';
import ReviewCard from './ReviewCard';
import { getFetchPath } from '../util/fetch';
import { Divider, Button, Modal } from '@material-ui/core';

const styles: JssStyleSheet = {
    root: {
        width: '100%'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0'
    }
}

const useStyles = createUseStyles(styles);

interface Props {
    objectId: number;
    limit?: number | null;
}

export default function ReviewList({ objectId, limit = null }: Props) {

    const classes = useStyles();

    const [reviews, setReviews] = React.useState<Review[]>([]);
    const [showFullList, setShowFullList] = React.useState(false);

    React.useEffect(() => {
        fetch(getFetchPath('/api/reviews', { object: objectId, limit }))
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`${res.status}`);
                }
            })
            .then((rev) => setReviews(rev))
            .catch(err => console.error(err));
    }, []);

    const onBtnClick = () => {
        setShowFullList(true);

        fetch(getFetchPath('/api/reviews', { object: objectId }))
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`${res.status}`);
                }
            })
            .then(setReviews)
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.root}>
            {
                reviews.slice(0, limit ?? 0).map((review, index) => (
                    <>
                        <ReviewCard review={review} key={index} />
                        <Divider />
                    </>
                ))
            }
            <div className={classes.button}>
                <Button 
                    variant="contained" 
                    color="default" 
                    className={classes.button}
                    onClick={onBtnClick}>
                    ВСЕ ОТЗЫВЫ
                </Button>
            </div>
            <Modal 
                aria-labelledby={"modal-title"}
                open={showFullList}
                onClose={() => setShowFullList(false)}>
                <div id="modal-title">hi</div>
            </Modal>
        </div>
    )
}
