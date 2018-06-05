import React from 'react';
import {Workout, WorkoutExercise} from "../../models";

const workoutFactory = {
    "difficulty": 1,
    "exerciseRoutineConfig": [{
        "key": "squat-bodyweight",
        "quantity": 20
    }, {
        "key": "pushup",
        "quantity": 10
    }, {
        "duration": 15,
        "key": "plank"
    }, {
        "key": "jumping-jack",
        "quantity": 30
    }],
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fexercises%2Fpushup.png?alt=media&token=fee39b71-ff53-48c6-84ed-58790333601e",
    "name": "Home Bodyweight Workout",
    "uid": "beginner-home"
};

it('create workout', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);
});

it('complete workout', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 20, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 10, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 15);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 30, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(130);
    expect(completedWorkout.xpEarnedLabel).toEqual("130xp");
    expect(completedWorkout.gradePercent).toEqual(100);
    expect(completedWorkout.grade).toEqual("S");
});

it('complete workout with an A grade', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 20, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 10, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 15);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 20, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(120);
    expect(completedWorkout.xpEarnedLabel).toEqual("120xp");
    expect(completedWorkout.gradePercent).toEqual(92);
    expect(completedWorkout.grade).toEqual("A");
});

it('complete workout with an B grade', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 17, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 10, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 15);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 20, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(114);
    expect(completedWorkout.xpEarnedLabel).toEqual("114xp");
    expect(completedWorkout.gradePercent).toEqual(88);
    expect(completedWorkout.grade).toEqual("B");
});

it('complete workout with an C grade', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 10, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 8, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 15);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 20, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(94);
    expect(completedWorkout.xpEarnedLabel).toEqual("94xp");
    expect(completedWorkout.gradePercent).toEqual(72);
    expect(completedWorkout.grade).toEqual("C");
});

it('complete workout with an D grade', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 10, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 10, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 7);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 16, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(80);
    expect(completedWorkout.xpEarnedLabel).toEqual("80xp");
    expect(completedWorkout.gradePercent).toEqual(62);
    expect(completedWorkout.grade).toEqual("D");
});

it('complete workout with an F grade', () => {
    const workout = new Workout(workoutFactory);

    expect(workout.difficulty).toEqual(1);
    expect(workout.uid).toEqual("beginner-home");
    expect(workout.xp).toEqual(130);
    expect(workout.xpLabel).toEqual("130xp");
    expect(workout.imageUrl).toBeDefined();
    expect(workout.exerciseRoutineConfig.length).toEqual(4);
    expect(workout.exercises.length).toEqual(4);

    workout.exercises[0] = WorkoutExercise.complete(workout.exercises[0], 10, null);
    workout.exercises[1] = WorkoutExercise.complete(workout.exercises[1], 5, null);
    workout.exercises[2] = WorkoutExercise.complete(workout.exercises[2], null, 4);
    workout.exercises[3] = WorkoutExercise.complete(workout.exercises[3], 18, null);

    const completedWorkout = Workout.complete(workout);

    expect(completedWorkout.difficulty).toEqual(1);
    expect(completedWorkout.xp).toEqual(130);
    expect(completedWorkout.xpLabel).toEqual("130xp");
    expect(completedWorkout.xpEarned).toEqual(61);
    expect(completedWorkout.xpEarnedLabel).toEqual("61xp");
    expect(completedWorkout.gradePercent).toEqual(47);
    expect(completedWorkout.grade).toEqual("F");
});