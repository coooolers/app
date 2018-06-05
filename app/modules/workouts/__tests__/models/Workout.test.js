import React from 'react';
import {Workout} from "../../models";


it('create workout', () => {
    const workout = new Workout("Exercise Practice", [null, {
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
    }]);

    expect(workout.xp).toEqual(44);
    expect(workout.xpLabel).toEqual("44xp");
    expect(workout.routine.length).toEqual(5);
});

it('complete workout', () => {
    const workout = new Workout("Exercise Practice", [null, {
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
    }]);

    expect(workout.xp).toEqual(44);
    expect(workout.xpLabel).toEqual("44xp");
    expect(workout.routine.length).toEqual(5);

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
});