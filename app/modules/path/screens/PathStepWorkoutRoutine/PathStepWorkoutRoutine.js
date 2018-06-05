import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import QuantityExercise from "../../components/QuantityExercise";
import DurationExercise from "../../components/DurationExercise";

class PathStepWorkoutRoutine extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <TouchableOpacity onPress={params.goToExerciseHelp}>
                    <FontAwesome
                        style={{
                            color: '#007AFF',
                            fontSize: 22,
                            marginRight: 10
                        }}>{Icons.infoCircle}</FontAwesome>
                </TouchableOpacity>
            )
        }
    };

    constructor(props) {
        super(props);

        const {path, step, workout, exerciseIndex, onEarnedRewards} = props.navigation.state.params;
        this.state = {path, step, workout, exerciseIndex, onEarnedRewards};
    }

    componentWillMount() {
        this.props.navigation.setParams({goToExerciseHelp: this.goToExerciseHelp.bind(this)});
    }

    onQuantityExerciseDone = (workoutExercise, quantityCompleted) => {
        workoutExercise.completeWithQuantity(quantityCompleted);
        this.goToNextExercise();
    };

    onDurationExerciseDone = (workoutExercise, durationCompleted) => {
        workoutExercise.completeWithDuration(durationCompleted);
        this.goToNextExercise();
    };

    goToExerciseHelp = () => {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        this.props.navigation.push('ExerciseInfo', {
            exercise: workoutExercise.getExercise()
        });
    };

    goToNextExercise = () => {
        const {path, step, workout, exerciseIndex, onEarnedRewards} = this.state;
        const nextWorkoutExercise = workout.routine[exerciseIndex + 1];

        if (nextWorkoutExercise) {
            return this.props.navigation.navigate("PathStepWorkoutRoutine", {
                path,
                step,
                workout,
                exerciseIndex: exerciseIndex + 1,
                onEarnedRewards
            });
        } else {
            this.props.navigation.popToTop();

            setTimeout(() => {
                onEarnedRewards(step)
            }, 500);
        }
    };

    render() {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        if (workoutExercise.isQuantity) {
            return <QuantityExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onQuantityExerciseDone}
            />
        } else if (workoutExercise.isDuration) {
            return <DurationExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onDurationExerciseDone}
            />
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(PathStepWorkoutRoutine);