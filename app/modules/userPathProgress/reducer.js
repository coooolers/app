import * as t from './actionTypes';

let initialState = {
    byId: {},
    allIds: []
};

const pathsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.PATH_PROGRESS_LOADED:
            state.byId[action.user.uid] = action.pathProgress || {};
            state.allIds = Object.keys(state.byId);

            console.log(state);
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default pathsReducer;