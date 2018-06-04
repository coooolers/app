let __config = [];

export default class LevelConfig {
    static getForLevel(level) {
        return __config[level];
    }

    static load(config) {
        __config = config;
    }

    static num() {
        return __config.length;
    }
};