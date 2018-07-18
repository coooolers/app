import React from 'react';
import{validatePassword} from "../validate";

it('password is too short', () => {
    expect(validatePassword("11aa")).toEqual(false);
});

it('password is valid', () => {
    expect(validatePassword("11aaAAaa")).toEqual(true);
});