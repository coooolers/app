import * as t from './actionTypes';

let initialState = {
    paths: [],
};

const pathsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.PATHS_LOADED:
            return Object.assign({}, state, {paths: action.paths});
        default:
            return state;
    }
};

export default pathsReducer;