import React from 'react';
import moment from "moment";
import {getPathInProgress} from "../index";


it('handle no path in progress', () => {
    const path = getPathInProgress(
        [{
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }, {
            uid: "strength-training-101",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }],
        {});

    expect(path.uid).toEqual("welcome")
});

it('handle 1 path in progress', () => {
    const path = getPathInProgress(
        [{
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }, {
            uid: "strength-training-101",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }],
        {
            "strength-training-101": {
                introduction: {
                    completed: moment()
                }
            }
        });

    expect(path.uid).toEqual("strength-training-101");
});

it('handle 2 paths in progress', () => {
    const path = getPathInProgress(
        [{
            uid: "welcome",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }, {
            uid: "strength-training-101",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }, {
            uid: "nutrition-101",
            steps: {
                introduction: {uid: "introduction"},
                topic1: {uid: "topic1"},
                topic2: {uid: "topic2"},
                conclusion: {uid: "conclusion"}
            },
            stepsOrder: ["introduction", "topic1", "topic2", "conclusion"]
        }],
        {
            "strength-training-101": {
                introduction: {
                    completed: moment().subtract(1, 'days')
                },
                topic1: {
                    completed: moment().subtract(5, 'minutes')
                }
            },
            "nutrition-101": {
                introduction: {
                    completed: moment().subtract(10, 'minutes')
                }
            }
        });

    expect(path.uid).toEqual("strength-training-101");
});