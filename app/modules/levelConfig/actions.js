import * as api from './api';
import LevelConfig from "./utils/LevelConfig";

export const fetchLevelConfig = () => {
    return (dispatch) => {
        return api.fetchLevelConfig().then(levelConfig => {
            // @TODO: move this back to redux, but testing is an issue
            LevelConfig.load(levelConfig);
        });
    };
};