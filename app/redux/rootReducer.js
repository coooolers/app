import {combineReducers} from 'redux';

import {reducer as authReducer} from "../modules/auth";
import {reducer as characterReducer} from "../modules/characters";
import {reducer as screensReducer} from "../modules/screens";
import {reducer as pathsReducer} from "../modules/path";
import {reducer as userPathProgressReducer} from "../modules/userPathProgress";

// Combine all the reducers
const rootReducer = combineReducers({
    authReducer,
    characterReducer,
    screensReducer,
    pathsReducer,
    userPathProgressReducer
});

export default rootReducer;