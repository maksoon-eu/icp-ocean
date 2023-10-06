import { configureStore } from '@reduxjs/toolkit';
import items from '../components/itemsSlider/itemsSlice';
import project from '../components/projectSlider/projectSlice';
import projectList from '../components/projectList/projectListSlice';
import market from '../components/marketList/marketSlice';
import filters from '../components/sidebar/sidebarSlice';
import header from '../components/header/headerSlice';
import userNft from '../components/myTabs/nftSlice';
import userCollection from '../components/myTabs/collectionSlice';
import userSale from '../components/myTabs/saleSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {items, project, projectList, market, filters, header, userNft, userCollection, userSale},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;