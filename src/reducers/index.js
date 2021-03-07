import { combineReducers } from 'redux';
import searchBoxReducer from "./searchBoxReducer";

export default combineReducers({
  searchBox: searchBoxReducer
})