import {combineReducers} from "redux";
import cellReducer from './cellSlice';
import bundleReducer from './bundleSlice';

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundleReducer
});

export default reducers;