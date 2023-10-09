import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const headerAdapter = createEntityAdapter();

const initialState = headerAdapter.getInitialState({
    headerLoadingStatus: 'idle',
    totalCount: 0
})

export const fetchHeader = createAsyncThunk(
    'header/fetchHeader',
    async (name) => {
        const {request} = useHttp();
        return await request(`https://icp-ocean-api.vercel.app/market?_limit=10&q=${name}`)
    }
)

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeader.pending, (state) => {
                state.headerLoadingStatus = 'loading'
            })
            .addCase(fetchHeader.fulfilled, (state, action) => {
                state.headerLoadingStatus = 'idle'
                headerAdapter.setAll(state, action.payload)
                state.totalCount = action.payload.length
            })
            .addCase(fetchHeader.rejected, (state) => {
                state.headerLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const { reducer, actions } = headerSlice;

export default reducer;

export const {selectAll} = headerAdapter.getSelectors((state) => state.header);

export const {
    headerFetching,
    headerFetched,
    headerFetchingError
} = actions;