import React from 'react';
import {getRewardsForPath} from "../index";

it('xp, term, exercise', () => {
    const rewards = getRewardsForPath(path, global.exerciseConfig);

    expect(rewards).toEqual({
        xp: 174,
        term: 2,
        exercise: 5
    });
});