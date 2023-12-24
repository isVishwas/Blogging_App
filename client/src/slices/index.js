import { combineReducers } from "redux";
// Front
import LayoutReducer from "./layouts/reducer";
// Authentication
import LoginReducer from "./auth/login/reducer";

import UserReducer from "./users/reducer";



const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Loggedin: LoginReducer,
    Article: UserReducer
});

export default rootReducer;