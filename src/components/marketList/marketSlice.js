import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const marketAdapter = createEntityAdapter();

const initialState = marketAdapter.getInitialState({
    marketLoadingStatus: 'idle',
    page: 0,
    checkActiveFilter: false,
    checkActiveSort: false,
    totalCount: 0,
    prevCheckActiveFilter: false,
    prevCheckActiveSort: false,
    activeSort: {
        price: false,
        name: false
    }
});

export const fetchMarket = createAsyncThunk(
    'market/fetchMarket',
    async (arg, {getState}) => {
        const state = getState();

        const filter = state.filters.activeFilter;
        const sort = state.market.activeSort;

        const {request} = useHttp();
        let filterRequest = '';

        Object.keys(filter).map(item => {
            if (filter[item]) {
                if (item === 'price') {
                    filterRequest += `&price_gte=${filter[item][0]}&price_lte=${filter[item][1]}`
                } else {
                    filterRequest += `&${item}=${filter[item]}`
                }
            }
        })

        Object.keys(sort).map(item => {
            if (sort[item]) {
                filterRequest += `&_sort=${item}&_order=${sort[item]}`
            }
        })

        return await request(`https://icp-ocean-api.vercel.app/market?_page=${state.market.page}&_limit=20${filterRequest}`);
    }
)

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {
        checkFilter: (state, action) => {
            state.checkActiveFilter = action.payload;
        },
        checkSort: (state, action) => {
            state.checkActiveSort = action.payload;
        },
        changeSort: (state, action) => {
            state.activeSort[action.payload[0]] = action.payload[1];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarket.pending, state => {
                state.checkActiveFilter !==  state.prevCheckActiveFilter || state.checkActiveSort !==  state.prevCheckActiveSort ? state.page = 1 : state.page++;
                state.page === 1 ? state.marketLoadingStatus = 'loading' : state.marketLoadingStatus = 'updateLoading';
                state.prevCheckActiveFilter = state.checkActiveFilter
                state.prevCheckActiveSort = state.checkActiveSort
            })
            .addCase(fetchMarket.fulfilled, (state, action) => {
                state.marketLoadingStatus === 'loading' ? marketAdapter.setAll(state, action.payload) : marketAdapter.setMany(state, action.payload);
                state.marketLoadingStatus = 'idle';
                state.totalCount = action.payload.length;
            })
            .addCase(fetchMarket.rejected, state => {state.marketLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {reducer, actions} = marketSlice;

export default reducer;

export const {selectAll} = marketAdapter.getSelectors(state => state.market);

export const {
    marketFetching,
    marketFetched,
    marketFetchingError,
    checkFilter,
    changeSort,
    checkSort
} = actions;
