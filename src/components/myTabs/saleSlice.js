import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const userSaleAdapter = createEntityAdapter();

const initialState = userSaleAdapter.getInitialState({
    userSaleLoadingStatus: 'idle',
    checkActiveSaleSort: false,
    sortSale: {
        price: false,
        name: false
    }
})

export const fetchUserSale = createAsyncThunk(
    'userSale/fetchUserSale',
    async (arg, {getState}) => {
        const state = getState();

        const sort = state.userSale.sortSale;

        const {request} = useHttp();
        let filterRequest = '';

        Object.keys(sort).map(item => {
            if (sort[item]) {
                filterRequest += `?_sort=${item}&_order=${sort[item]}`
            }
        })

        return await request(`https://icp-ocean-api.vercel.app/userSale${filterRequest}`);
    }
)

const userSaleSlice = createSlice({
    name: 'userSale',
    initialState,
    reducers: {
        saleCreated: (state, action) => {
            userSaleAdapter.addOne(state, action.payload)
        },
        saleDeleted: (state, action) => {
            userSaleAdapter.removeOne(state, action.payload)
        },
        changeSaleSort: (state, action) => {
            state.sortSale[action.payload[0]] = action.payload[1];
        },
        checkSaleSort: (state, action) => {
            state.checkActiveSaleSort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        
            .addCase(fetchUserSale.pending, (state => {state.userSaleLoadingStatus = 'loading'}))
            .addCase(fetchUserSale.fulfilled, ((state, action) => {
                state.userSaleLoadingStatus = 'idle';
                userSaleAdapter.setAll(state, action.payload)
            }))
            .addCase(fetchUserSale.rejected, (state => {state.userSaleLoadingStatus = 'error'}))
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = userSaleSlice;

export default reducer;

const {selectAll} = userSaleAdapter.getSelectors(state => state.userSale);
export const selectAllSale = selectAll;

export const {
    userSaleFetching,
    userSaleFetched,
    userSaleFetchingError,
    saleCreated,
    saleDeleted,
    changeSaleSort,
    checkSaleSort
} = actions;