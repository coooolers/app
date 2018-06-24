import React from 'react';
import {isPathStepComplete} from "../index";

it('handle incompleted path step', () => {
    expect(isPathStepComplete(
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
        {uid: "topic1"},
        {
            welcome: {
                introduction: {completed: new Date()}
            }
        }
    )).toEqual(false);
});

it('handle completed path step', () => {
    expect(isPathStepComplete(
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
        {uid: "introduction"},
        {
            welcome: {
                introduction: {completed: new Date()}
            }
        }
    )).toEqual(true);
});