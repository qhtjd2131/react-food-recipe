import { combineReducers } from "redux";
import searchReducer from "./search";

const rootReducer = combineReducers({
    searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
