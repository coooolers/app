import * as api from './api';
import * as t from "./actionTypes";

export const fetchPathCategories = () => {
    return (dispatch) => {
        return api.fetchPathCategories().then(pathCategories => {
            dispatch({type: t.PATH_CATEGORIES_LOADED, pathCategories});
        });
    };
};