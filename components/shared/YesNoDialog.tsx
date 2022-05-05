import React from "react";
import { Button, Dialog } from "@mui/material";
import styles from "./yesNoDialog.module.scss";

const YesNoDialog = (props: DialogProps) => {
    const { onClose, onAccept, open, title } = props;

    return<Dialog onClose={() => onClose()} open={open}>
        <div className={styles.title}>{title}</div>
        <div className={styles.actions}>
            <Button variant="outlined" color="primary" className={styles.dialog_button} onClick={() => onAccept("no")}>いいえ</Button>
            <Button variant="contained" color="primary" className={styles.dialog_button} onClick={() => onAccept("yes")}>はい</Button>
        </div>
    </Dialog>
}

export interface DialogProps {
    open: boolean;
    onClose: any;
    onAccept: (value: string) => void;
    title: string;
}

export default YesNoDialog;