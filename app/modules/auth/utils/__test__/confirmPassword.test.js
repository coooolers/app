import React from 'react';
import{confirmPassword} from "../validate";

it('passwords match', () => {
    expect(confirmPassword("11aaAAaa", "11aaAAaa")).toEqual(true);
});

it('passwords do not match', () => {
    expect(confirmPassword("11aaAAaa", "22ssSSss")).toEqual(false);
});