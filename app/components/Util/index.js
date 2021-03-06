import {StackActions, NavigationActions} from "react-navigation";
import _ from "lodash";
import moment from "moment";
import {REWARD_TYPES, STEP_TYPES} from "../../modules/path/constants";
import ExerciseConfig from "../../modules/exercises/utils/ExerciseConfig";
import {Workout} from "../../modules/workouts/models";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
export const round = (number, precision = 0) => {
    let shift = (number, precision, reverseShift) => {
        if (reverseShift) {
            precision = -precision;
        }
        let numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
};

export const stringifyXp = (xp) => {
    return `${xp}xp`;
};

export function upperCaseFirstCharacter(string) {
    return string[0].toUpperCase() + string.substr(1);
}

export const secondsToMMSS = (seconds) => {
    let minutes = Math.floor((seconds) / 60);
    seconds = seconds - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
};

export const goToMainTabRoute = (navigation, key) => {
    navigation.dispatch(StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: 'Main'})
        ],
    }));

    navigation.navigate(key);
};

export const goToPathStep = (navigation, params = {}) => {
    let routeKey = null;
    let routeParams = Object.assign({}, params);

    if (routeParams.step.type === STEP_TYPES.AUDIO) {
        routeKey = "PathStepAudio";
    } else if (routeParams.step.type === STEP_TYPES.WORKOUT) {
        routeKey = "PathStepWorkout";
        routeParams.workout = new Workout(routeParams.step.name, routeParams.step.workoutRoutine);
    } else {
        throw new Error("Invalid path step type provided for transition");
    }

    navigation.navigate('Path', routeParams);
    navigation.navigate(routeKey, routeParams);
};

export const getRewardsForPath = (path) => {
    const steps = _(path["stepsOrder"]).compact().map(s => path["steps"][s]).value();
    const stepRewards = _(steps).map(s => getRewardsForStep(s)).compact().value();

    return {
        [REWARD_TYPES.XP]: _(stepRewards).sumBy(REWARD_TYPES.XP),
        [REWARD_TYPES.TERM]: _(stepRewards).sumBy(REWARD_TYPES.TERM),
        [REWARD_TYPES.WORKOUT]: _(stepRewards).sumBy(REWARD_TYPES.WORKOUT),
        [REWARD_TYPES.EXERCISE]: _(stepRewards).sumBy(REWARD_TYPES.EXERCISE)
    };
};

export const getRewardsForStep = (step) => {
    let result = Object.assign({}, step.rewards);

    if (step.type === STEP_TYPES.AUDIO) {
        return result;
    } else if (step.type === STEP_TYPES.WORKOUT) {
        // calc dynamic exercise xp
        result[REWARD_TYPES.XP] = 0;

        _(step.workoutRoutine).compact().forEach(i => {
            const exercise = ExerciseConfig.getByKey(i.key);
            result[REWARD_TYPES.XP] += exercise.xp * (i.duration || i.quantity);
        });
        return result;
    }
};

export const getPathStepProgress = (path, pathProgress) => {
    let stepIndex = 0;

    path.stepsOrder.forEach(stepUid => {
        if (isPathStepComplete(path, path.steps[stepUid], pathProgress)) {
            stepIndex += 1;
        }
    });

    return {
        total: path.stepsOrder.length,
        current: stepIndex + 1,
        step: path.steps[path.stepsOrder[stepIndex]],
        progress: round((stepIndex) / path.stepsOrder.length, 2)
    };
};

export const isPathComplete = (path, pathProgress) => {
    return path.stepsOrder.every(stepUid => {
        return isPathStepComplete(path, path.steps[stepUid], pathProgress);
    });
};

export const isPathIncomplete = (path, pathProgress) => {
    return !isPathComplete(path, pathProgress);
};

export const isPathStepComplete = (path, step, pathProgress) => {
    return !!(pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid]);
};

export const getPathStepCompletedDate = (path, step, pathProgress) => {
    if (isPathStepComplete(path, step, pathProgress)) {
        return pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid].completed;
    }
};

export const getPathInProgress = (paths, pathProgress) => {
    const pathKeys = paths.map(p => p.uid);
    let latestTimestamp;
    let pathInProgress = paths[0];

    pathKeys.forEach(pathKey => {
        const path = paths.find(p => p.uid === pathKey);

        if (pathProgress[pathKey]) {
            const stepKeys = Object.keys(pathProgress[pathKey]);
            stepKeys.forEach(stepKey => {
                const step = path.steps[stepKey];

                if (isPathStepComplete(path, step, pathProgress)) {
                    const completedTimestamp = pathProgress[pathKey][stepKey].completed;

                    if ((moment(completedTimestamp).isSameOrAfter(latestTimestamp) || !latestTimestamp)) {
                        latestTimestamp = completedTimestamp;
                        pathInProgress = path;
                    }
                }
            });
        }

    });

    return pathInProgress;
};

export const getNextStepInPath = (path, step) => {
    const {stepsOrder, steps} = path;
    const currentStepIndex = stepsOrder.indexOf(step.uid);
    const nextStepUid = path.stepsOrder[currentStepIndex + 1];

    if (nextStepUid) {
        return steps[nextStepUid];
    } else {
        return null;
    }
};