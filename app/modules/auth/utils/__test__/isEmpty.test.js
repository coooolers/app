import React from 'react';
import{isEmpty} from "../validate";

it('undefined is empty', () => {
    expect(isEmpty()).toEqual(true);
});

it('null is empty', () => {
    expect(isEmpty(null)).toEqual(true);
});

it('"" is empty', () => {
    expect(isEmpty("")).toEqual(true);
});

it('"String" is not empty', () => {
    expect(isEmpty("String")).toEqual(false);
});