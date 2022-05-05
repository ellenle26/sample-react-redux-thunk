import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Filters } from "../../libs/filter-type";
import { getFilters } from "../filter-api";

export type StateTypes = {
    filterOptions: Filters | null,
    queryFilters: {
        prefecture: string,
        callFlag: string,
        companyStatus: string,
        // industry: string,
        branchName: string,
        companyName: string,
        // lastCallDate: number | null,
        personInCharge: string,
        scheduledRecallDate: number | null
    }
    page: number
}

const initialState: StateTypes = {
    filterOptions: null,
    queryFilters: {
        prefecture: '',
        callFlag: '',
        companyStatus: '',
        // industry: '',
        branchName: '',
        companyName: '',
        // lastCallDate: null,
        personInCharge: '',
        scheduledRecallDate: null
    },
    page: 1
}

export const getFilterOptions = createAsyncThunk('filter/get', async () => {
    const response = (await getFilters()).data;
    const data = response.data;
    return data;
})


const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        saveQueryFilters(state, action) {
            return {...state, queryFilters: action.payload};
        },
        savePrefecture(state, action) {
            const newSelection = {
                ...state.queryFilters,
                prefecture: action.payload
            }
            return { ...state, queryFilters: newSelection}
        },
        saveCompanyStatus(state, action) {
            const newSelection = {
                ...state.queryFilters,
                companyStatus: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveCallFlag(state, action) {
            const newSelection = {
                ...state.queryFilters,
                callFlag: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveIndustry(state, action) {
            const newSelection = {
                ...state.queryFilters,
                industry: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveBranchName(state, action) {
            const newSelection = {
                ...state.queryFilters,
                branchName: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveCompanyName(state, action) {
            const newSelection = {
                ...state.queryFilters,
                companyName: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveLastCallDate(state, action) {
            const newSelection = {
                ...state.queryFilters,
                lastCallDate: action.payload == 0 ? null : action.payload 
            }
            return { ...state, queryFilters: newSelection }
        },
        savePersonInCharge(state, action) {
            const newSelection = {
                ...state.queryFilters,
                personInCharge: action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        saveScheduledRecallDate(state, action) {
            const newSelection = {
                ...state.queryFilters,
                scheduledRecallDate: action.payload == 0 ? null : action.payload
            }
            return { ...state, queryFilters: newSelection }
        },
        savePage(state, action) {
            return {...state, page: action.payload}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFilterOptions.fulfilled, (state, action) => {
                return { ...state, filterOptions: action.payload }
            })
    }
});

export const { saveQueryFilters, savePrefecture, saveCompanyStatus, saveCallFlag, saveIndustry, saveLastCallDate, savePersonInCharge, saveScheduledRecallDate, savePage, saveCompanyName, saveBranchName } = filterSlice.actions;

export default filterSlice.reducer;