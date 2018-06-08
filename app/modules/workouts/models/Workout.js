import {round, stringifyXp} from "../../../components/Util";
import _ from 'lodash';
import ExerciseConfig from "../../exercises/utils/ExerciseConfig";
import {WorkoutExercise} from "../models";
import {WORKOUT_GRADES} from "../constants";

export default class Workout {
    constructor(name, routine) {
        this.name = name;
        this.xp = 0;
        this.xpEarned = 0;
        this.routine = [];
        this.isComplete = false;

        _(routine).compact().forEach(r => {
            const exercise = ExerciseConfig.getByKey(r.key);
            const workoutExercise = r.quantity ?
                WorkoutExercise.createFromQuantity(exercise, r.quantity) :
                WorkoutExercise.createFromDuration(exercise, r.duration);
            this.routine.push(workoutExercise);
            this.xp += workoutExercise.xp;
        });

        this.xpLabel = stringifyXp(this.xp);
        this.xpEarnedLabel = stringifyXp(this.xpEarned);

        return this;
    }

    complete = () => {
        this.isComplete = true;
        this.xpEarned = 0;

        this.routine.forEach(workoutExercise => {
            this.xpEarned += workoutExercise.xpEarned;
        });

        this.xpEarnedLabel = stringifyXp(this.xpEarned);

        this.calcGrade();

        return this;
    };

    calcGrade = () => {
        this.gradePercent = round((this.xpEarned / this.xp) * 100);

        if (this.gradePercent === 100) {
            this.grade = WORKOUT_GRADES.S;
        } else if (this.gradePercent >= 90) {
            this.grade = WORKOUT_GRADES.A;
        } else if (this.gradePercent >= 80) {
            this.grade = WORKOUT_GRADES.B;
        } else if (this.gradePercent >= 70) {
            this.grade = WORKOUT_GRADES.C;
        } else if (this.gradePercent >= 60) {
            this.grade = WORKOUT_GRADES.D;
        } else {
            this.grade = WORKOUT_GRADES.F;
        }
    }
}