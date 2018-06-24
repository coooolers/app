import React from 'react';
import {isPathIncomplete} from "../index";

it('handle incomplete path', () => {
    expect(isPathIncomplete(
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
            welcome: {
                introduction: {completed: new Date()}
            }
        }
    )).toEqual(true);
});

it('handle completed path', () => {
    expect(isPathIncomplete(
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
            welcome: {
                introduction: {completed: new Date()},
                topic1: {completed: new Date()},
                topic2: {completed: new Date()},
                conclusion: {completed: new Date()}
            }
        }
    )).toEqual(false);
});