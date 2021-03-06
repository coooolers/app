import * as api from './api';
import * as t from "./actionTypes";

export const fetchUserPathProgress = (user) => {
    return (dispatch) => {
        return api.fetchUserPathProgress(user).then(pathProgress => {
            dispatch({
                type: t.PATH_PROGRESS_LOADED,
                user,
                pathProgress: pathProgress
            });
        });
    };
};

export const updateUserPathProgress = (user, pathProgress) => {
    return (dispatch) => {
        return api.updateUserPathProgress(user, pathProgress).then(pathProgress => {
            dispatch({
                type: t.PATH_PROGRESS_LOADED,
                user,
                pathProgress: pathProgress
            });
        });
    };
};