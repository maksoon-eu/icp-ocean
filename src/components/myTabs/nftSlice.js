import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const userNftAdapter = createEntityAdapter();

const initialState = userNftAdapter.getInitialState({
    userNftLoadingStatus: 'idle',
    checkActiveNftSort: false,
    sortNft: {
        price: false,
        name: false
    }
});

export const fetchUserNft = createAsyncThunk(
    'userNft/fetchUserNft',
    async (arg, {getState}) => {
        const state = getState();

        const sort = state.userNft.sortNft;

        const {request} = useHttp();
        let filterRequest = '';

        Object.keys(sort).map(item => {
            if (sort[item]) {
                filterRequest += `?_sort=${item}&_order=${sort[item]}`
            }
        })

        return await request(`https://icp-ocean-api.vercel.app/userNft${filterRequest}`);
    }
)

const userNftSlice = createSlice({
    name: 'userNft',
    initialState,
    reducers: {
        itemCreated: (state, action) => {
            userNftAdapter.addOne(state, action.payload);
        },
        nftDeleted: (state, action) => {
            userNftAdapter.removeOne(state, action.payload);
        },
        changeNftSort: (state, action) => {
            state.sortNft[action.payload[0]] = action.payload[1];
        },
        checkNftSort: (state, action) => {
            state.checkActiveNftSort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserNft.pending, (state) => {state.userNftLoadingStatus = 'loading'})
            .addCase(fetchUserNft.fulfilled, (state, action) => {
                state.userNftLoadingStatus = 'idle';
                userNftAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUserNft.rejected, (state) => {state.userNftLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }

})

const {actions, reducer} = userNftSlice;

export default reducer;

const {selectAll} = userNftAdapter.getSelectors(state => state.userNft);
export const selectAllNft = selectAll;

export const {
    userNftFetching,
    userNftFetched,
    userNftFetchingError,
    itemCreated,
    nftDeleted,
    changeNftSort,
    checkNftSort
} = actions;