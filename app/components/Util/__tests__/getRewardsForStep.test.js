import React from 'react';
import {getRewardsForStep} from "../index";

it('get single rewards for simple audio step', () => {
    const rewards = getRewardsForStep({
        name: "Introduction",
        "rewards": [null, {
            "key": "xp",
            "value": 20
        }],
        "type": "audio"
    }, global.exerciseConfig);

    expect(rewards).toEqual({
        xp: 20
    });
});

it('get multiple rewards for simple audio step', () => {
    const rewards = getRewardsForStep({
        name: "Introduction",
        "rewards": [null, {
            "key": "term",
            "value": 2
        }, {
            "key": "xp",
            "value": 20
        }],
        "type": "audio"
    }, global.exerciseConfig);

    expect(rewards).toEqual({
        term: 2,
        xp: 20
    });
});

it('get rewards for workout step', () => {
    const rewards = getRewardsForStep({
        "rewards": [null, {
            "key": "exercise",
            "value": 5
        }, {
            "key": "xp",
            "value": 0
        }],
        "type": "workout",
        "workoutRoutine": [null, {
            "key": "squat-bodyweight",
            "quantity": 3 // 6xp
        }, {
            "key": "pushup",
            "quantity": 3 // 9xp
        }, {
            "key": "lunge",
            "quantity": 3 // 6xp
        }, {
            "duration": 10,
            "key": "plank" // 10xp
        }, {
            "key": "jumping-jack",
            "quantity": 3 // 3xp
        }]
    }, global.exerciseConfig);

    expect(rewards).toEqual({
        xp: 44,
        exercise: 5
    });
});