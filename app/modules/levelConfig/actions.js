import * as t from './actionTypes';
import * as api from './api';

export const fetchLevelConfig = () => {
    return (dispatch) => {
        return api.fetchLevelConfig().then(levelConfig => {
            dispatch({type: t.LEVEL_CONFIG_LOADED, levelConfig});
        });
    };
};