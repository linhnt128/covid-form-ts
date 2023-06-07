import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loadDataReducer } from './reducers/loadDataSlice';
import { rootReducer } from './reducers/rootReducer';


const store = configureStore(
    {
        reducer: rootReducer
    }
);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; 
export default store;
export type RootState = ReturnType<typeof store.getState>;

