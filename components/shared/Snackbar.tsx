import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from '@mui/material';
import { clear } from "../../apis/reducers/snackbarsReducer";
import { RootState } from "../../apis/store";


export default function SnackbarMessage() {
    const dispatch = useDispatch();
    const { snackbarOpen, snackbarMessage, messageType } = useSelector((state: RootState) => state.snackbars);

    const handleClose = () => {
        dispatch(clear());
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            open={snackbarOpen}
            autoHideDuration={4000}
            resumeHideDuration={2000}
            onClose={handleClose}
        >
            {messageType === "error" || messageType === "success" || messageType === "info" || messageType === "warning" ?
                <Alert onClose={handleClose} severity={messageType}>
                    {snackbarMessage}
                </Alert> : <></>
            }
        </Snackbar>
    );
}