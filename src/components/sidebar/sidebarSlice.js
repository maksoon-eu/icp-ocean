import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const sidebarAdapter = createEntityAdapter();

const initialState = sidebarAdapter.getInitialState({
    activeFilter: {
        categories: false,
        price: false,
        rarity: false,
        collections: false,
        blockchain: false
    }
})

const sidebarSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filterChange: (state, action) => {
            state.activeFilter[action.payload[0]] = action.payload[1];
        }
    }
})

const {reducer, actions} = sidebarSlice;

export default reducer;

export const {
    filterChange
} = actions;