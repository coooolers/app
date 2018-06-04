let __config = {};

export default class ExerciseConfig {
    static getByKey(key) {
        if (__config[key]) {
            return __config[key];
        } else {
            throw new Error(`Invalid exercise config lookup - ${key} does not exist`);
        }
    }

    static load(config) {
        __config = config;
    }
};