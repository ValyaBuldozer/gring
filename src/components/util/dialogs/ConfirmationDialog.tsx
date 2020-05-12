import * as React from 'react';
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useLocaleString from '../../../hooks/useLocaleString';

interface Props {
    open: boolean;
    title: string;
    onClose: (confirmState: boolean) => void;
}

export default function ConfirmationDialog({open, title, onClose}: Props) {
    const localeString = useLocaleString();

    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={() => onClose(false)} variant="text" color="primary">
                    {localeString.NO}
                </Button>
                <Button onClick={() => onClose(true)} variant="contained" color="primary">
                    {localeString.YES}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
