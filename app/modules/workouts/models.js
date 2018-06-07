import {stringifyXp} from "../../components/Util";
import _ from 'lodash';
import ExerciseConfig from "../exercises/utils/ExerciseConfig";

export class Workout {
    constructor(name, routine) {
        this.name = name;
        this.xp = 0;
        this.routine = [];
        this.isComplete = false;

        _(routine).compact().forEach(r => {
            const exercise = ExerciseConfig.getByKey(r.key);
            const wre = r.quantity ?
                WorkoutRoutineExercise.createFromQuantity(exercise, r.quantity) :
                WorkoutRoutineExercise.createFromDuration(exercise, r.duration);
            this.routine.push(wre);
            this.xp += wre.xp;
        });

        this.xpLabel = stringifyXp(this.xp);

        return this;
    }

    complete = () => {
        this.isComplete = true;
        this.xpEarned = 0;

        this.routine.forEach(wre => {
            this.xpEarned += wre.xpEarned;
        });

        this.xpEarnedLabel = stringifyXp(this.xpEarned);

        return this;
    };
}

export class WorkoutRoutineExercise {
    constructor(exercise, quantity, duration) {
        // base
        this.name = exercise.name;
        this.pluralizedName = exercise.pluralizedName;
        this.imageUrl = exercise.imageUrl;
        this.isComplete = false;

        // durations
        this.duration = duration;
        this.durationLabel = duration ? `${duration}s` : "";
        this.durationCompleted = 0;
        this.durationCompletedLabel = "0s";
        this.isDuration = !!duration;

        // quantities
        this.quantity = quantity;
        this.quantityLabel = quantity ? `${quantity}` : "";
        this.quantityCompleted = 0;
        this.quantityCompletedLabel = "0";
        this.quantity = quantity;
        this.isQuantity = !!quantity;

        // private
        this._exercise = exercise;

        return this;
    }

    static createFromQuantity(exercise, quantity) {
        const wre = new WorkoutRoutineExercise(exercise, quantity, null);

        wre.xp = exercise.xp * quantity;
        wre.xpLabel = stringifyXp(wre.xp);
        wre.xpEarned = 0;
        wre.xpEarnedLabel = stringifyXp(wre.xpEarned);
        return wre;
    }

    static createFromDuration(exercise, duration) {
        const wre = new WorkoutRoutineExercise(exercise, null, duration);

        wre.xp = exercise.xp * duration;
        wre.xpLabel = stringifyXp(wre.xp);
        wre.xpEarned = 0;
        wre.xpEarnedLabel = stringifyXp(wre.xpEarned);
        return wre;
    }

    completeWithQuantity = (quantityCompleted) => {
        this.isComplete = true;
        this.xpEarned = this._exercise.xp * quantityCompleted;
        this.xpEarnedLabel = stringifyXp(this.xpEarned);
        this.quantityCompleted = quantityCompleted;
        this.quantityCompletedLabel = `${quantityCompleted}`;
        return this;
    };

    completeWithDuration = (durationCompleted) => {
        this.isComplete = true;
        this.xpEarned = this._exercise.xp * durationCompleted;
        this.xpEarnedLabel = stringifyXp(this.xpEarned);
        this.durationCompleted = durationCompleted;
        this.durationCompletedLabel = `${durationCompleted}s`;
        return this;
    };

    getExercise = () => {
        return this._exercise;
    }
}