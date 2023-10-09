import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
    itemsLoadingStatus: 'idle'
});

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async () => {
        const {request} = useHttp();
        return await request('https://icp-ocean-api.vercel.app/itemsSlider');
    }
);

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, state => {state.itemsLoadingStatus = 'loading'})
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.itemsLoadingStatus = 'idle';
                itemsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchItems.rejected, state => {state.itemsLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = itemsSlice;

export default reducer;

export const {selectAll} = itemsAdapter.getSelectors(state => state.items);

export const {
    itemsFetching,
    itemsFetched,
    itemsFetchingError
} = actions;

