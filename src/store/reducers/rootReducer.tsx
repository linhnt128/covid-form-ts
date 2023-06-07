import { combineReducers } from '@reduxjs/toolkit';
import { loadDataReducer } from './loadDataSlice';

export const rootReducer = combineReducers(
    {
        loadData: loadDataReducer
    }
);

