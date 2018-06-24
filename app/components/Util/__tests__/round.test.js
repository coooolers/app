import React from 'react';
import {round} from "../index";


it('round value up without precision', () => {
    expect(round(123.66)).toEqual(124);
});

it('round value down without precision', () => {
    expect(round(123.44)).toEqual(123);
});

it('round value up without 2 precision', () => {
    expect(round(123.6688, 2)).toEqual(123.67);
});

it('round value down without 2 precision', () => {
    expect(round(123.4444, 2)).toEqual(123.44);
});