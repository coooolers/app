import * as t from './actionTypes';

let initialState = {
    levelConfig: {}
};

const levelConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LEVEL_CONFIG_LOADED:
            return Object.assign({}, state, {levelConfig: action.levelConfig});
        default:
            return state;
    }
};

export default levelConfigReducer;