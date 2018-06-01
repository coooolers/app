import * as t from './actionTypes';

let initialState = {
    byId: [],
    allIds: []
};

const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.EXERCISES_LOADED:
            state.byId = action.exercises;
            state.allIds = Object.keys(action.exercises);
            return Object.assign({}, state);
        default:
            return state;
    }
};

export default workoutsReducer;