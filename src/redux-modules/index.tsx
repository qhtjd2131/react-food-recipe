import { combineReducers } from "redux";
import searchReducer from "./search";

const rootReducer = combineReducers({
    searchReducer,
})

export default rootReducer;