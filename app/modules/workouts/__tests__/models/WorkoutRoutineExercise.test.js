import React from 'react';
import {WorkoutRoutineExercise} from "../../models";

const exercise = {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d",
    name: "Lunge",
    pluralizedName: "Lunges",
    xp: 2
};

it('create exercise from quantity', () => {
    const wre = WorkoutRoutineExercise.createFromQuantity(exercise, 10);

    expect(wre.name).toEqual(exercise.name);
    expect(wre.pluralizedName).toEqual(exercise.pluralizedName);
    expect(wre.imageUrl).toEqual(exercise.imageUrl);
    expect(wre.duration).toEqual(null);
    expect(wre.durationLabel).toEqual("");
    expect(wre.durationCompleted).toEqual(0);
    expect(wre.durationCompletedLabel).toEqual("0s");
    expect(wre.isDuration).toEqual(false);
    expect(wre.quantity).toEqual(10);
    expect(wre.quantityLabel).toEqual("10");
    expect(wre.quantityCompleted).toEqual(0);
    expect(wre.quantityCompletedLabel).toEqual("0");
    expect(wre.isQuantity).toEqual(true);
    expect(wre.xp).toEqual(20);
    expect(wre.xpLabel).toEqual("20xp");
    expect(wre.xpEarned).toEqual(0);
    expect(wre.xpEarnedLabel).toEqual("0xp");
    expect(wre.isComplete).toEqual(false);
});

it('create exercise from duration', () => {
    const wre = WorkoutRoutineExercise.createFromDuration(exercise, 30);

    expect(wre.name).toEqual(exercise.name);
    expect(wre.pluralizedName).toEqual(exercise.pluralizedName);
    expect(wre.imageUrl).toEqual(exercise.imageUrl);
    expect(wre.duration).toEqual(30);
    expect(wre.durationLabel).toEqual("30s");
    expect(wre.durationCompleted).toEqual(0);
    expect(wre.durationCompletedLabel).toEqual("0s");
    expect(wre.isDuration).toEqual(true);
    expect(wre.quantity).toEqual(null);
    expect(wre.quantityLabel).toEqual("");
    expect(wre.quantityCompleted).toEqual(0);
    expect(wre.quantityCompletedLabel).toEqual("0");
    expect(wre.isQuantity).toEqual(false);
    expect(wre.xp).toEqual(60);
    expect(wre.xpLabel).toEqual("60xp");
    expect(wre.xpEarned).toEqual(0);
    expect(wre.xpEarnedLabel).toEqual("0xp");
    expect(wre.isComplete).toEqual(false);
});

it('create exercise from quantity and complete it', () => {
    let wre = WorkoutRoutineExercise.createFromQuantity(exercise, 10);
    wre.completeWithQuantity(10);

    expect(wre.name).toEqual(exercise.name);
    expect(wre.pluralizedName).toEqual(exercise.pluralizedName);
    expect(wre.imageUrl).toEqual(exercise.imageUrl);
    expect(wre.duration).toEqual(null);
    expect(wre.durationLabel).toEqual("");
    expect(wre.durationCompleted).toEqual(0);
    expect(wre.durationCompletedLabel).toEqual("0s");
    expect(wre.isDuration).toEqual(false);
    expect(wre.quantity).toEqual(10);
    expect(wre.quantityLabel).toEqual("10");
    expect(wre.quantityCompleted).toEqual(10);
    expect(wre.quantityCompletedLabel).toEqual("10");
    expect(wre.isQuantity).toEqual(true);
    expect(wre.xp).toEqual(20);
    expect(wre.xpLabel).toEqual("20xp");
    expect(wre.xpEarned).toEqual(20);
    expect(wre.xpEarnedLabel).toEqual("20xp");
    expect(wre.isComplete).toEqual(true);
});

it('create exercise from duration and complete it', () => {
    let wre = WorkoutRoutineExercise.createFromDuration(exercise, 30);
    wre.completeWithDuration(30);

    expect(wre.name).toEqual(exercise.name);
    expect(wre.pluralizedName).toEqual(exercise.pluralizedName);
    expect(wre.imageUrl).toEqual(exercise.imageUrl);
    expect(wre.duration).toEqual(30);
    expect(wre.durationLabel).toEqual("30s");
    expect(wre.durationCompleted).toEqual(30);
    expect(wre.durationCompletedLabel).toEqual("30s");
    expect(wre.isDuration).toEqual(true);
    expect(wre.quantity).toEqual(null);
    expect(wre.quantityLabel).toEqual("");
    expect(wre.quantityCompleted).toEqual(0);
    expect(wre.quantityCompletedLabel).toEqual("0");
    expect(wre.isQuantity).toEqual(false);
    expect(wre.xp).toEqual(60);
    expect(wre.xpLabel).toEqual("60xp");
    expect(wre.xpEarned).toEqual(60);
    expect(wre.xpEarnedLabel).toEqual("60xp");
    expect(wre.isComplete).toEqual(true);
});