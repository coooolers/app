import React from 'react';
import {secondsToMMSS} from "../index";


it('convert < 1 minute', () => {
    expect(secondsToMMSS(59)).toEqual("0:59");
});

it('convert 1 minute', () => {
    expect(secondsToMMSS(60)).toEqual("1:00");
});

it('convert 0', () => {
    expect(secondsToMMSS(0)).toEqual("0:00");
});

it('convert > 1 minute', () => {
    expect(secondsToMMSS(61)).toEqual("1:01");
});

it('convert > 2 minutes', () => {
    expect(secondsToMMSS(130)).toEqual("2:10");
});