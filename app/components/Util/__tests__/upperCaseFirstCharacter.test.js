import React from 'react';
import {upperCaseFirstCharacter} from "../index";


it('converts lower to upper character', () => {
    expect(upperCaseFirstCharacter("lowercase")).toEqual("Lowercase");
});

it('converts upper to upper character', () => {
    expect(upperCaseFirstCharacter("Uppercase")).toEqual("Uppercase");
});