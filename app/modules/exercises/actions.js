import * as api from './api';
import ExerciseConfig from "./utils/ExerciseConfig";

export function fetchExercises() {
    return (dispatch) => {
        return api.fetchExercises().then(exercises => {
            // @TODO: move this back to redux, but testing is an issue
            ExerciseConfig.load(exercises);
        });
    };
}