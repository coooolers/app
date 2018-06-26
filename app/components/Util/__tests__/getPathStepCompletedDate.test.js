import React from 'react';
import moment from "moment";
import {getPathStepCompletedDate} from "../index";


it('get date for a completed path', () => {
    const pathProgress = {welcome: {introduction: {completed: new Date()}}};
    const step = {uid: "introduction"};
    const completedDate = getPathStepCompletedDate(
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
        step,
        pathProgress);

    expect(completedDate).toEqual(pathProgress.welcome.introduction.completed);
});

it('handle incomplete path', () => {
    const pathProgress = {welcome: {}};
    const step = {uid: "introduction"};
    const completedDate = getPathStepCompletedDate(
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
        step,
        pathProgress);

    expect(completedDate).toEqual(undefined);
});