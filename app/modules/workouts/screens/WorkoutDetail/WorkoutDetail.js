import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';
import Reporting from "../../../reporting";

import styles from "./styles";
import XpLabel from "../../../../components/XpLabel";
import Button from "../../../../components/Button/Button";

class WorkoutDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.workout.name
        }
    };

    constructor(props) {
        super(props);
        const {workout} = props.navigation.state.params;
        this.state = {workout};
    }

    startWorkoutRoutine = (workout) => {
        Reporting.track("workout__start", {
            name: workout.name
        });

        this.props.navigation.navigate("WorkoutRoutine", {
            workout,
            workoutExerciseIndex: 0
        })
    };

    goToExerciseHelp = (exercise) => {
        this.props.navigation.navigate('ExerciseInfo', {exercise});
    };

    renderWorkoutExerciseItem = (workoutExercise, index) => {
        return (
            <TouchableOpacity key={index} style={styles.exerciseRow}
                              onPress={() => this.goToExerciseHelp(workoutExercise.exercise)}>
                <Image source={{uri: workoutExercise.imageUrl}} style={
                    StyleSheet.flatten([styles.exerciseImage], {resizeMode: 'cover'})
                }/>
                <Text style={styles.exerciseName}>{workoutExercise.name}</Text>
                <Text
                    style={styles.exerciseReps}>{workoutExercise.quantityLabel || workoutExercise.durationLabel}</Text>
                <Text style={styles.exerciseReward}>{workoutExercise.xpLabel}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        const {workout} = this.state;

        return (
            <ScrollView style={styles.container}>
                <Image source={{uri: workout.imageUrl}} style={styles.image}/>
                <View style={styles.content}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.title}>{workout.name}</Text>
                        <XpLabel xp={workout.xp} iconSize={21}/>
                    </View>
                    <View style={styles.exerciseRoutineContainer}>
                        <View style={styles.exerciseRowHeader}>
                            <Text style={styles.exerciseImage}/>
                            <Text style={styles.exerciseNameLabel}/>
                            <Text style={styles.exerciseRepsLabel}>Reps</Text>
                            <Text style={styles.exerciseRewardLabel}>Reward</Text>
                        </View>
                        {workout.exercises.map(this.renderWorkoutExerciseItem)}
                    </View>
                    <Button title={"Start Workout"}
                            containerViewStyle={{
                                marginTop: 20
                            }}
                            onPress={() => this.startWorkoutRoutine(workout)}/>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(WorkoutDetail);