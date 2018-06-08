import {stringifyXp} from "../../../components/Util";

export default class WorkoutExercise {
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

        // privateWorkoutRoutineExercise
        this._exercise = exercise;

        return this;
    }

    static createFromQuantity(exercise, quantity) {
        const workoutExercise = new WorkoutExercise(exercise, quantity, null);

        workoutExercise.xp = exercise.xp * quantity;
        workoutExercise.xpLabel = stringifyXp(workoutExercise.xp);
        workoutExercise.xpEarned = 0;
        workoutExercise.xpEarnedLabel = stringifyXp(workoutExercise.xpEarned);
        return workoutExercise;
    }

    static createFromDuration(exercise, duration) {
        const workoutExercise = new WorkoutExercise(exercise, null, duration);

        workoutExercise.xp = exercise.xp * duration;
        workoutExercise.xpLabel = stringifyXp(workoutExercise.xp);
        workoutExercise.xpEarned = 0;
        workoutExercise.xpEarnedLabel = stringifyXp(workoutExercise.xpEarned);
        return workoutExercise;
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