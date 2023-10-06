import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const userCollectionAdapter = createEntityAdapter();

const initialState = userCollectionAdapter.getInitialState({
    userCollectionLoadingStatus: 'idle',
    checkActiveCollectionSort: false,
    sortCollection: {
        price: false,
        name: false
    }
});

export const fetchUserCollection = createAsyncThunk(
    'userCollection/fetchUserCollection',
    async (arg, {getState}) => {
        const state = getState();

        const sort = state.userCollection.sortCollection;

        const {request} = useHttp();
        let filterRequest = '';

        Object.keys(sort).map(item => {
            if (sort[item]) {
                filterRequest += `?_sort=${item}&_order=${sort[item]}`
            }
        })

        return await request(`http://localhost:3001/userCollection${filterRequest}`);
    }
)

const userCollectionSlice = createSlice({
    name: 'userCollection',
    initialState,
    reducers: {
        itemCreated: (state, action) => {
            userCollectionAdapter.addOne(state, action.payload);
        },
        collectionDeleted: (state, action) => {
            userCollectionAdapter.removeOne(state, action.payload);
        },
        changeCollectionSort: (state, action) => {
            state.sortCollection[action.payload[0]] = action.payload[1];
        },
        checkCollectionSort: (state, action) => {
            state.checkActiveCollectionSort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCollection.pending, (state) => {state.userCollectionLoadingStatus = 'loading'})
            .addCase(fetchUserCollection.fulfilled, (state, action) => {
                state.userCollectionLoadingStatus = 'idle';
                userCollectionAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUserCollection.rejected, (state) => {state.userCollectionLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }

})

const {actions, reducer} = userCollectionSlice;

export default reducer;

const {selectAll} = userCollectionAdapter.getSelectors(state => state.userCollection);
export const selectAllCollection = selectAll;

export const {
    userCollectionFetching,
    userCollectionFetched,
    userCollectionFetchingError,
    itemCreated,
    collectionDeleted,
    changeCollectionSort,
    checkCollectionSort
} = actions;