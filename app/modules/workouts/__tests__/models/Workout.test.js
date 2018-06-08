import React from 'react';
import {Workout} from "../../models";

const workoutStub = [null, {
    "key": "squat-bodyweight",
    "quantity": 3
}, {
    "key": "pushup",
    "quantity": 3
}, {
    "key": "lunge",
    "quantity": 3
}, {
    "duration": 10,
    "key": "plank"
}, {
    "key": "jumping-jack",
    "quantity": 3
}];

it('create workout', () => {
    const workout = new Workout("Exercise Practice", workoutStub);

    expect(workout.xp).toEqual(44);
    expect(workout.xpLabel).toEqual("44xp");
    expect(workout.xpEarned).toEqual(0);
    expect(workout.xpEarnedLabel).toEqual("0xp");
    expect(workout.routine.length).toEqual(5);
    expect(workout.isComplete).toEqual(false);
});

it('complete workout', () => {
    const workout = new Workout("Exercise Practice", workoutStub);

    expect(workout.xp).toEqual(44);
    expect(workout.xpLabel).toEqual("44xp");
    expect(workout.xpEarned).toEqual(0);
    expect(workout.xpEarnedLabel).toEqual("0xp");
    expect(workout.routine.length).toEqual(5);
    expect(workout.isComplete).toEqual(false);

    workout.routine[0].completeWithQuantity(3);
    workout.routine[1].completeWithQuantity(3);
    workout.routine[2].completeWithQuantity(3);
    workout.routine[3].completeWithDuration(10);
    workout.routine[4].completeWithQuantity(3);

    workout.complete();

    expect(workout.xp).toEqual(44);
    expect(workout.xpLabel).toEqual("44xp");
    expect(workout.xpEarned).toEqual(44);
    expect(workout.xpEarnedLabel).toEqual("44xp");
    expect(workout.isComplete).toEqual(true);
    expect(workout.gradePercent).toEqual(100);
    expect(workout.grade).toEqual("S");
});

describe("calculate grade levels", () => {
    it('complete workout with an A grade', () => {
        const workout = new Workout("Exercise Practice", workoutStub);

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.xpEarned).toEqual(0);
        expect(workout.xpEarnedLabel).toEqual("0xp");
        expect(workout.routine.length).toEqual(5);
        expect(workout.isComplete).toEqual(false);

        workout.routine[0].completeWithQuantity(3);
        workout.routine[1].completeWithQuantity(2);
        workout.routine[2].completeWithQuantity(3);
        workout.routine[3].completeWithDuration(10);
        workout.routine[4].completeWithQuantity(3);

        workout.complete();

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.gradePercent).toEqual(93);
        expect(workout.grade).toEqual("A");
        expect(workout.xpEarned).toEqual(41);
        expect(workout.xpEarnedLabel).toEqual("41xp");
        expect(workout.isComplete).toEqual(true);
    });

    it('complete workout with an B grade', () => {
        const workout = new Workout("Exercise Practice", workoutStub);

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.xpEarned).toEqual(0);
        expect(workout.xpEarnedLabel).toEqual("0xp");
        expect(workout.routine.length).toEqual(5);
        expect(workout.isComplete).toEqual(false);

        workout.routine[0].completeWithQuantity(3);
        workout.routine[1].completeWithQuantity(1);
        workout.routine[2].completeWithQuantity(3);
        workout.routine[3].completeWithDuration(10);
        workout.routine[4].completeWithQuantity(3);

        workout.complete();

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.gradePercent).toEqual(86);
        expect(workout.grade).toEqual("B");
        expect(workout.xpEarned).toEqual(38);
        expect(workout.xpEarnedLabel).toEqual("38xp");
        expect(workout.isComplete).toEqual(true);
    });

    it('complete workout with an C grade', () => {
        const workout = new Workout("Exercise Practice", workoutStub);

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.xpEarned).toEqual(0);
        expect(workout.xpEarnedLabel).toEqual("0xp");
        expect(workout.routine.length).toEqual(5);
        expect(workout.isComplete).toEqual(false);

        workout.routine[0].completeWithQuantity(3);
        workout.routine[1].completeWithQuantity(1);
        workout.routine[2].completeWithQuantity(3);
        workout.routine[3].completeWithDuration(7);
        workout.routine[4].completeWithQuantity(3);

        workout.complete();

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.gradePercent).toEqual(73);
        expect(workout.grade).toEqual("C");
        expect(workout.xpEarned).toEqual(32);
        expect(workout.xpEarnedLabel).toEqual("32xp");
        expect(workout.isComplete).toEqual(true);
    });

    it('complete workout with an D grade', () => {
        const workout = new Workout("Exercise Practice", workoutStub);

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.xpEarned).toEqual(0);
        expect(workout.xpEarnedLabel).toEqual("0xp");
        expect(workout.routine.length).toEqual(5);
        expect(workout.isComplete).toEqual(false);

        workout.routine[0].completeWithQuantity(3);
        workout.routine[1].completeWithQuantity(1);
        workout.routine[2].completeWithQuantity(3);
        workout.routine[3].completeWithDuration(5);
        workout.routine[4].completeWithQuantity(3);

        workout.complete();

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.gradePercent).toEqual(64);
        expect(workout.grade).toEqual("D");
        expect(workout.xpEarned).toEqual(28);
        expect(workout.xpEarnedLabel).toEqual("28xp");
        expect(workout.isComplete).toEqual(true);
    });

    it('complete workout with an F grade', () => {
        const workout = new Workout("Exercise Practice", workoutStub);

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.xpEarned).toEqual(0);
        expect(workout.xpEarnedLabel).toEqual("0xp");
        expect(workout.routine.length).toEqual(5);
        expect(workout.isComplete).toEqual(false);

        workout.routine[0].completeWithQuantity(0);
        workout.routine[1].completeWithQuantity(0);
        workout.routine[2].completeWithQuantity(0);
        workout.routine[3].completeWithDuration(5);
        workout.routine[4].completeWithQuantity(3);

        workout.complete();

        expect(workout.xp).toEqual(44);
        expect(workout.xpLabel).toEqual("44xp");
        expect(workout.gradePercent).toEqual(30);
        expect(workout.grade).toEqual("F");
        expect(workout.xpEarned).toEqual(13);
        expect(workout.xpEarnedLabel).toEqual("13xp");
        expect(workout.isComplete).toEqual(true);
    });
});
