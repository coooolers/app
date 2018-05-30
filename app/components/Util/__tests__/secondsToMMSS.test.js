import React from 'react';
import {secondsToMMSS} from "../index";


it('convert < 1 minute', () => {
    expect(secondsToMMSS(59)).toEqual("00:59");
});

it('convert 1 minute', () => {
    expect(secondsToMMSS(60)).toEqual("01:00");
});

it('convert 0', () => {
    expect(secondsToMMSS(0)).toEqual("00:00");
});

it('convert > 1 minute', () => {
    expect(secondsToMMSS(61)).toEqual("01:01");
});

it('convert > 2 minutes', () => {
    expect(secondsToMMSS(130)).toEqual("02:10");
});