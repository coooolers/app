import {NavigationActions} from "react-navigation";
import _ from "lodash";
import {REWARD_TYPES, STEP_TYPES} from "../../modules/path/constants";
import ExerciseConfig from "../../modules/exercises/utils/ExerciseConfig";

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

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ':' + seconds;
};

export const goToMainTabRoute = (navigation, key) => {
    navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: 'Main'})
        ],
    }));
    navigation.navigate(key);
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
    let result = {};
    _(step.rewards).compact().forEach(r => result[r.key] = r.value);

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