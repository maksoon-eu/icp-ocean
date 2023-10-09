import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const projectAdapter = createEntityAdapter();

const initialState = projectAdapter.getInitialState({
    projectLoadingStatus: 'idle'
});

export const fetchProjects = createAsyncThunk(
    'projects/fetchProject',
    async () => {
        const {request} = useHttp()
        return await request('https://icp-ocean-api.vercel.app/projectSlider');
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, state => {state.projectLoadingStatus = 'loading'})
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projectLoadingStatus = 'idle';
                projectAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProjects.rejected, state => {state.projectLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = projectSlice;

export default reducer;

export const {selectAll} = projectAdapter.getSelectors(state => state.project)

export const {
    projectFetching,
    projectFetched,
    projectFetchingError
} = actions;
