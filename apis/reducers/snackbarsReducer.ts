import { createSlice } from '@reduxjs/toolkit';

export interface stateTypes {
    snackbarOpen: boolean,
    snackbarMessage:  string
    messageType: string,
}

const initialState: stateTypes = {
    snackbarOpen: false,
    snackbarMessage: '',
    messageType: '',
};

const snackbarsSlice = createSlice({
    name: 'snackbars',
    initialState,
    reducers: {
        success(state, action) {
            const message = action.payload;
            return { ...state, snackbarOpen: true, snackbarMessage: message, messageType: "success"};
        },
        error(state, action) {
            const message = action.payload;
            return { ...state, snackbarOpen: true, snackbarMessage: message, messageType: "error" };
        },
        info(state, action) {
            const message = action.payload;
            return { ...state, snackbarOpen: true, snackbarMessage: message, messageType: "info" };
        },
        warning(state, action) {
            const message = action.payload;
            return { ...state, snackbarOpen: true, snackbarMessage: message, messageType: "warning" };
        },
        clear(state) {
            return { ...state, snackbarOpen: false };
        },
    }
});

export const { success, error, info, warning, clear } = snackbarsSlice.actions;

export default snackbarsSlice.reducer;