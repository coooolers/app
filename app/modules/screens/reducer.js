import * as t from './actionTypes';

let initialState = {
    screens: {}
};

const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.SCREENS_LOADED:
            return Object.assign({}, state, {screens: action.screens});
        default:
            return state;
    }
};

export default characterReducer;