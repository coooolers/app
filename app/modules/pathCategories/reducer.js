import * as t from './actionTypes';

let initialState = {
    byId: {},
    allIds: [],
    order: []
};

const pathsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.PATH_CATEGORIES_LOADED:
            state.order = action.pathCategories.order;
            state.order.map(key => state.byId[key] = action.pathCategories[key]);
            state.allIds = Object.keys(state.byId);
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default pathsReducer;