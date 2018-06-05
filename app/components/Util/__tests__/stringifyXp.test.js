import React from 'react';
import {stringifyXp} from "../index";


it('convert string value', () => {
    expect(stringifyXp("123")).toEqual("123xp");
});

it('converts number value', () => {
    expect(stringifyXp(123)).toEqual("123xp");
});