import * as t from './actionTypes';

let initialState = {
    byId: {},
    allIds: []
};

const pathsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.PATHS_LOADED:
            delete action.paths.order; // deprecated data value from old app version

            Object.keys(action.paths).map(key => state.byId[key] = action.paths[key]);
            state.allIds = Object.keys(state.byId);
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default pathsReducer;