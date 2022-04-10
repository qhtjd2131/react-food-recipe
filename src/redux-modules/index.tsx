import { combineReducers } from "redux";
import searchReducer from "./search";
// import overlayReducer from "./overlay";

const rootReducer = combineReducers({
    searchReducer,
    // overlayReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
