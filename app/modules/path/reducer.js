import * as t from './actionTypes';

let initialState = {
    byId: {},
    allIds: [],
    order: []
};

const pathsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.PATHS_LOADED:
            state.order = action.paths.order;
            state.byId = {};

            state.order.forEach(uid => {
                state.byId[uid] = action.paths[uid];
            });
            state.allIds = Object.keys(state.byId);
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default pathsReducer;