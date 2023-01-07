import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import {
  insertCellAfter
} from './cellSlice';

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

store.dispatch(insertCellAfter({id: null, type: 'code'}));
store.dispatch(insertCellAfter({id: null, type: 'text'}));
store.dispatch(insertCellAfter({id: null, type: 'code'}));
store.dispatch(insertCellAfter({id: null, type: 'code'}));
