import * as api from './api';
import * as t from "./actionTypes";

export const fetchPaths = () => {
    return (dispatch) => {
        return api.fetchPaths().then(paths => {
            dispatch({type: t.PATHS_LOADED, paths});
        });
    };
};