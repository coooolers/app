import React from 'react';
import {getPathStepProgress} from "../index";


it('get path step progress with no completion', () => {
    expect(getPathStepProgress(
        {
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        },
        {}
    )).toEqual({
        total: 4,
        current: 1,
        step: {uid: "introduction"},
        progress: 0
    });
});

it('get path step progress with some completion', () => {
    expect(getPathStepProgress(
        {
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        },
        {
            "welcome": {
                introduction: {completed: new Date()},
                topic1: {completed: new Date()}
            }
        }
    )).toEqual({
        total: 4,
        current: 3,
        step: {uid: "topic2"},
        progress: 0.5
    });
});

it('get path step progress with entire completion', () => {
    expect(getPathStepProgress(
        {
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        },
        {
            "welcome": {
                introduction: {completed: new Date()},
                topic1: {completed: new Date()},
                topic2: {completed: new Date()},
                conclusion: {completed: new Date()}
            }
        }
    )).toEqual({
        total: 4,
        current: 5,
        step: undefined,
        progress: 1
    });
});