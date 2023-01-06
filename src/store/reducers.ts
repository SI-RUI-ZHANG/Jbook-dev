import {combineReducers} from "redux";
import cellReducer from './cellSlice';

const reducers = combineReducers({
  cells: cellReducer
});

export default reducers;