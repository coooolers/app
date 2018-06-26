import React from "react";
import {StackNavigator} from 'react-navigation';
import PathScreen from "../../modules/path/screens/Path";
import PathStepAudioScreen from "../../modules/path/screens/PathStepAudio";
import PathStepWorkoutScreen from "../../modules/path/screens/PathStepWorkout";
import PathStepWorkoutRoutineScreen from "../../modules/path/screens/PathStepWorkoutRoutine";
import PathStepRewardScreen from "../../modules/path/screens/PathStepReward";
import ExerciseInfo from "../../modules/exercises/screens/ExerciseInfo";


export default StackNavigator({
    PathStepAudio: {screen: PathStepAudioScreen},
    PathStepWorkout: {screen: PathStepWorkoutScreen},
    PathStepWorkoutRoutine: {screen: PathStepWorkoutRoutineScreen},
    PathStepReward: {screen: PathStepRewardScreen},
    ExerciseInfo: {screen: ExerciseInfo},
    Path: {screen: PathScreen},
}, {
    initialRouteName: 'Path'
})