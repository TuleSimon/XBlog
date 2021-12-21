import { createSlice } from "@reduxjs/toolkit";

export const ReduxSlice = createSlice({
    name: 'redux',
    initialState: {
        loading: false,
        snackbar: {
            open: false,
            type: 'success',
            message: '',
        },
        search: '',
        backdrop: false,
        dialog: { open: false, error: false, message: "", title: '' },
    },
    reducers: {

        setSearch: (state, action) => {
            state.search = action.payload;
        },
        toggleLoading: (state) => {
            state.loading = !loading
        },
        toggleBackdrop: (state) => {
            state.backdrop = true
        },
        closeSk: (state) => {
            state.snackbar = {...state.snackbar, open: false }
        },
        closeBackdrop: (state) => {
            state.backdrop = false;;
        },
        setSnackbar: (state, action) => {
            state.snackbar = action.payload
        },
        showDialog: (state, action) => {
            state.dialog = action.payload;
        },
        closeDialog: (state) => {
            state.dialog = { open: false, error: false, message: "", title: '' };
        }

    },
});

export const { setSearch, toggleLoading, closeSk, closeBackdrop, toggleBackdrop, setSnackbar, showDialog, closeDialog } = ReduxSlice.actions;

export const selectDialog = (state) => state.redux.dialog;
export const getSnackbar = (state) => state.redux.snackbar;
export const getSearch = (state) => state.redux.search;
export const getLoading = (state) => state.redux.loading;
export const getBackdrop = (state) => state.redux.backdrop

export default ReduxSlice.reducer;