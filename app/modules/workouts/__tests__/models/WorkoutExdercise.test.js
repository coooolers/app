import React from 'react';
import {WorkoutExercise} from "../../models";

const exercise = {
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/fitness-quest-1ad0f.appspot.com/o/images%2Fexercises%2Fexercise-image.png?alt=media&token=96d517ca-85ce-4281-af83-f0a81bf25e7d",
    name: "Lunge",
    pluralizedName: "Lunges",
    xp: 2
};

it('create exercise from quantity', () => {
    const workoutExercise = WorkoutExercise.createFromQuantity(exercise, 10);

    expect(workoutExercise.name).toEqual(exercise.name);
    expect(workoutExercise.pluralizedName).toEqual(exercise.pluralizedName);
    expect(workoutExercise.imageUrl).toEqual(exercise.imageUrl);
    expect(workoutExercise.duration).toEqual(null);
    expect(workoutExercise.durationLabel).toEqual("");
    expect(workoutExercise.durationCompleted).toEqual(0);
    expect(workoutExercise.durationCompletedLabel).toEqual("0s");
    expect(workoutExercise.isDuration).toEqual(false);
    expect(workoutExercise.quantity).toEqual(10);
    expect(workoutExercise.quantityLabel).toEqual("10");
    expect(workoutExercise.quantityCompleted).toEqual(0);
    expect(workoutExercise.quantityCompletedLabel).toEqual("0");
    expect(workoutExercise.isQuantity).toEqual(true);
    expect(workoutExercise.xp).toEqual(20);
    expect(workoutExercise.xpLabel).toEqual("20xp");
    expect(workoutExercise.xpEarned).toEqual(0);
    expect(workoutExercise.xpEarnedLabel).toEqual("0xp");
    expect(workoutExercise.isComplete).toEqual(false);
});

it('create exercise from duration', () => {
    const workoutExercise = WorkoutExercise.createFromDuration(exercise, 30);

    expect(workoutExercise.name).toEqual(exercise.name);
    expect(workoutExercise.pluralizedName).toEqual(exercise.pluralizedName);
    expect(workoutExercise.imageUrl).toEqual(exercise.imageUrl);
    expect(workoutExercise.duration).toEqual(30);
    expect(workoutExercise.durationLabel).toEqual("30s");
    expect(workoutExercise.durationCompleted).toEqual(0);
    expect(workoutExercise.durationCompletedLabel).toEqual("0s");
    expect(workoutExercise.isDuration).toEqual(true);
    expect(workoutExercise.quantity).toEqual(null);
    expect(workoutExercise.quantityLabel).toEqual("");
    expect(workoutExercise.quantityCompleted).toEqual(0);
    expect(workoutExercise.quantityCompletedLabel).toEqual("0");
    expect(workoutExercise.isQuantity).toEqual(false);
    expect(workoutExercise.xp).toEqual(60);
    expect(workoutExercise.xpLabel).toEqual("60xp");
    expect(workoutExercise.xpEarned).toEqual(0);
    expect(workoutExercise.xpEarnedLabel).toEqual("0xp");
    expect(workoutExercise.isComplete).toEqual(false);
});

it('create exercise from quantity and complete it', () => {
    let workoutExercise = WorkoutExercise.createFromQuantity(exercise, 10);
    workoutExercise.completeWithQuantity(10);

    expect(workoutExercise.name).toEqual(exercise.name);
    expect(workoutExercise.pluralizedName).toEqual(exercise.pluralizedName);
    expect(workoutExercise.imageUrl).toEqual(exercise.imageUrl);
    expect(workoutExercise.duration).toEqual(null);
    expect(workoutExercise.durationLabel).toEqual("");
    expect(workoutExercise.durationCompleted).toEqual(0);
    expect(workoutExercise.durationCompletedLabel).toEqual("0s");
    expect(workoutExercise.isDuration).toEqual(false);
    expect(workoutExercise.quantity).toEqual(10);
    expect(workoutExercise.quantityLabel).toEqual("10");
    expect(workoutExercise.quantityCompleted).toEqual(10);
    expect(workoutExercise.quantityCompletedLabel).toEqual("10");
    expect(workoutExercise.isQuantity).toEqual(true);
    expect(workoutExercise.xp).toEqual(20);
    expect(workoutExercise.xpLabel).toEqual("20xp");
    expect(workoutExercise.xpEarned).toEqual(20);
    expect(workoutExercise.xpEarnedLabel).toEqual("20xp");
    expect(workoutExercise.isComplete).toEqual(true);
});

it('create exercise from duration and complete it', () => {
    let workoutExercise = WorkoutExercise.createFromDuration(exercise, 30);
    workoutExercise.completeWithDuration(30);

    expect(workoutExercise.name).toEqual(exercise.name);
    expect(workoutExercise.pluralizedName).toEqual(exercise.pluralizedName);
    expect(workoutExercise.imageUrl).toEqual(exercise.imageUrl);
    expect(workoutExercise.duration).toEqual(30);
    expect(workoutExercise.durationLabel).toEqual("30s");
    expect(workoutExercise.durationCompleted).toEqual(30);
    expect(workoutExercise.durationCompletedLabel).toEqual("30s");
    expect(workoutExercise.isDuration).toEqual(true);
    expect(workoutExercise.quantity).toEqual(null);
    expect(workoutExercise.quantityLabel).toEqual("");
    expect(workoutExercise.quantityCompleted).toEqual(0);
    expect(workoutExercise.quantityCompletedLabel).toEqual("0");
    expect(workoutExercise.isQuantity).toEqual(false);
    expect(workoutExercise.xp).toEqual(60);
    expect(workoutExercise.xpLabel).toEqual("60xp");
    expect(workoutExercise.xpEarned).toEqual(60);
    expect(workoutExercise.xpEarnedLabel).toEqual("60xp");
    expect(workoutExercise.isComplete).toEqual(true);
});