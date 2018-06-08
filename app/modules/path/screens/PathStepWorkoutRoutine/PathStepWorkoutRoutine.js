import React from 'react';
import {TouchableOpacity, ScrollView, View, Alert, Image, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import QuantityExercise from "../../components/QuantityExercise";
import DurationExercise from "../../components/DurationExercise";
import {color} from "../../../../styles/theme";
import styles from "./styles";
import {WORKOUT_GRADES} from "../../../workouts/constants";

class PathStepWorkoutRoutine extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {goToExerciseHelp, cancelWorkout} = navigation.state.params || {};

        return {
            headerLeft: <RNButton onPress={() => cancelWorkout()} title={"Cancel"}/>,
            headerRight: (
                <TouchableOpacity onPress={() => goToExerciseHelp()}>
                    <FontAwesome style={{color: color.brandDark, fontSize: 22, marginRight: 10}}>
                        {Icons.infoCircle}
                    </FontAwesome>
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
        this.props.navigation.setParams({
            goToExerciseHelp: this.goToExerciseHelp.bind(this),
            cancelWorkout: this.cancelWorkout.bind(this)
        });
    }

    onQuantityExerciseDone = (workoutExercise, quantityCompleted) => {
        workoutExercise.completeWithQuantity(quantityCompleted);
        this.goToNextExercise();
    };

    onDurationExerciseDone = (workoutExercise, durationCompleted) => {
        workoutExercise.completeWithDuration(durationCompleted);
        this.goToNextExercise();
    };

    cancelWorkout = () => {
        Alert.alert(
            'Cancel Workout?',
            'Any rewards earned will not be saved.',
            [
                {
                    text: 'No',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => this.props.navigation.popToTop(),
                },
            ]
        );
    };

    goToExerciseHelp = () => {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        this.props.navigation.push('ExerciseInfo', {
            exercise: workoutExercise.getExercise()
        });
    };

    goToExercise = (exerciseIndex) => {
        const {workout} = this.state;
        const exercises = workout.routine.slice(0, exerciseIndex);
        const allPreviousExercisesComplete = exercises.every(e => e.isComplete);

        if (allPreviousExercisesComplete) {
            this.setState({exerciseIndex});

            const xOffset = 70 * exerciseIndex;
            this.exerciseScrollView.scrollTo({x: xOffset, y: 0, animated: true});
        }
    };

    goToNextExercise = () => {
        const {step, workout, exerciseIndex, onEarnedRewards} = this.state;
        const nextWorkoutExercise = workout.routine[exerciseIndex + 1];

        if (nextWorkoutExercise) {
            this.goToExercise(exerciseIndex + 1);
        } else {
            this.props.navigation.popToTop();

            if (workout.grade === WORKOUT_GRADES.S) {
                setTimeout(() => {
                    onEarnedRewards(step)
                }, 500);
            }
        }
    };

    renderExerciseNavigationItem = (e, i) => {
        const {exerciseIndex} = this.state;
        const isCurrentExercise = exerciseIndex === i;
        const itemStyles = isCurrentExercise ?
            [styles.navigationItem, styles.navigationItemActive] : styles.navigationItem;
        const completedIcon = e.isComplete ?
            <FontAwesome style={styles.navigationItemCompletedIcon}>{Icons.checkCircleO}</FontAwesome> :
            null;

        return (
            <TouchableOpacity key={i} style={itemStyles} onPress={() => this.goToExercise(i)}>
                <Image source={{uri: e.imageUrl}}
                       style={styles.navigationImage}/>
                {completedIcon}
            </TouchableOpacity>
        )
    };

    renderExerciseNavigation = () => {
        const {workout} = this.state;

        return (
            <View style={styles.navigation}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                            ref={(e) => this.exerciseScrollView = e}>
                    {workout.routine.map(this.renderExerciseNavigationItem)}
                </ScrollView>
            </View>
        )
    };

    render() {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        const content = workoutExercise.isQuantity ?
            <QuantityExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onQuantityExerciseDone}
            /> :
            <DurationExercise
                workoutExercise={workoutExercise}
                workout={workout}
                onDone={this.onDurationExerciseDone}
            />;

        return (
            <View style={styles.container}>
                {this.renderExerciseNavigation()}
                <View style={styles.content}>{content}</View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(PathStepWorkoutRoutine);