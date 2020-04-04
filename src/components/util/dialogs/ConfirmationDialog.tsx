import * as React from 'react';
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface Props {
    open: boolean;
    title: string;
    onClose: (confirmState: boolean) => void;
}

export default function ConfirmationDialog({open, title, onClose}: Props) {
    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={() => onClose(false)} variant="text" color="primary">
                    Нет
                </Button>
                <Button onClick={() => onClose(true)} variant="contained" color="primary">
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    )
}
