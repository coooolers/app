// TODO: temporary reducer until we create a normalized reward screen
let initialState = {
    item: null
};

const pathStepToCompleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PATH_STEP_TO_COMPLETE':
            return Object.assign({}, state, {
                item: {
                    step: action.step,
                    path: action.path
                }
            });
        case 'PATH_STEP_TO_COMPLETE_COMPLETED':
            return Object.assign({}, state, {item: null});
        default:
            return state;
    }
};

export default pathStepToCompleteReducer;