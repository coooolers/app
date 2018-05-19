import * as t from './actionTypes';
import * as api from './api';

export const fetchScreens = () => {
    return (dispatch) => {
        return api.fetchScreens().then(screens => {
            dispatch({type: t.SCREENS_LOADED, screens});
        });
    };
};