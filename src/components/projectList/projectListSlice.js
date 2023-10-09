import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const projectListAdapter = createEntityAdapter();

const initialState = projectListAdapter.getInitialState({
    projectListLoadingStatus: 'idle',
    page: 1,
    totalCount: 0
})

export const fetchProjectList = createAsyncThunk(
    'projectList/fetchProjectList',
    async (arg, {getState}) => {
        const state = getState();

        const {request} = useHttp();
        return await request(`https://icp-ocean-api.vercel.app/projectList?_page=${state.projectList.page}&_limit=6`);
    }
)

const projectListSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectList.pending, state => {
                state.page === 1 ? state.projectListLoadingStatus = 'loading' : state.projectListLoadingStatus = 'updateLoading';
            })
            .addCase(fetchProjectList.fulfilled, (state, action) => {
                state.projectListLoadingStatus = 'idle';
                state.totalCount = action.payload.length;
                projectListAdapter.setMany(state, action.payload);
                state.page++;
            })
            .addCase(fetchProjectList.rejected, state => {state.projectListLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = projectListSlice;

export default reducer;

export const { selectAll } = projectListAdapter.getSelectors(state => state.projectList);

export const {
    projectListFetching,
    projectListFetched,
    projectListFetchingError,
    projectListChanged
} = actions;